const createApiError = require('../utils/createApiError');

module.exports = async function getCampaignForDomain(db, domain) {
  console.log('Attempting to get campaigns');
  try {
    const campaigns = db.collection('campaigns');

    const campaign = await campaigns.findOne({ domains: domain });

    return campaign;
  } catch (error) {
    return createApiError(error, 500, 'Error retrieving campaign from database');
  }
}
