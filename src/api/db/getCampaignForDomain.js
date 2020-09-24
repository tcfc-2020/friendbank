const createApiError = require('../utils/createApiError');

module.exports = async function getCampaignForDomain(db, domain) {
  console.log('Attempting to get campaigns');
  try {
    const campaigns = db.collection('campaigns');
    console.log(db);
    console.log(domain);

    const campaign = await campaigns.findOne({ domains: domain });
    
    console.log('Found Campaign.');
    console.log(campaign);
    console.log('End Campaign');

    return campaign;
  } catch (error) {
    return createApiError(error, 500, 'Error retrieving campaign from database');
  }
}
