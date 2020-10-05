const getPageForCode = require('../db/getPageForCode');
const validateBackgroundField = require('../utils/validateBackgroundField');
const validateAndNormalizeApiRequestFields = require('../utils/validateAndNormalizeApiRequestFields');
const apiErrorHandler = require('../utils/apiErrorHandler');
const transformPageResponse = require('../transformers/transformPageResponse');
const sendMail = require('../services/sendMail');
const {
  MAIL_SIGNUP_ALERT_ID,
  MAIL_SIGNUP_ALERT_RECIPIENTS,
} = process.env;

module.exports = ({ db }) => {
  async function createPage(req, res) {
    try {
      const {
        campaign,
        token,
        params: {
          code,
        },
        body: {
          title,
          subtitle,
          background,
        },
      } = req;

      const validationResult = validateAndNormalizeApiRequestFields({
        title,
        subtitle,
        background,
        code,
      });

      if (Array.isArray(validationResult)) {
        res.status(400).json({
          field: validationResult[0],
          error: validationResult[1],
        });

        return;
      }

      const backgroundFieldValidation = await validateBackgroundField(db, token, campaign, background);

      if (backgroundFieldValidation instanceof Error) {
        throw backgroundFieldValidation;
      }

      if (backgroundFieldValidation) {
        res.status(400).json(backgroundFieldValidation);
        return;
      }

      const existingPage = await getPageForCode(
        db,
        campaign._id.toString(),
        validationResult.code,
      );

      if (existingPage instanceof Error) {
        throw existingPage;
      }

      if (existingPage) {
        res.status(409).json({ error: 'This code is in use already.' });
        return;
      }

      const page = {
        code: validationResult.code,
        campaign: campaign._id.toString(),
        createdBy: token.user._id.toString(),
        title: validationResult.title,
        subtitle: validationResult.subtitle,
        background: validationResult.background,
        createdAt: Date.now(),
        lastUpdatedAt: Date.now(),
      };

      const pages = db.collection('pages');
      await pages.insertOne(page);

      // Email admins to notify of successful creation
      const mailResult = await sendMail(
        process.env.MAIL_SIGNUP_ALERT_RECIPIENTS.split(','),
        process.env.MAIL_SIGNUP_ALERT_ID,
        {
          first: token.user.firstName,
          email: token.user.email,
          title: page.title,
          subtitle: page.subtitle,
          code: validationResult.code,
        },
      );

      if (mailResult instanceof Error) {
        throw mailResult;
      }

      res.json({ page });
    } catch (error) {
      apiErrorHandler(res, error);
    }
  }

  return createPage;
}
