import Campaign from "../models/campaign.model.js";


export const createCampaign = async (req, res) => {
  const newCampaign = new Campaign(req.body);
  await newCampaign.save();
  res.status(201).json(newCampaign);
};


export const getAllCampaigns = async (req, res) => {
  const campaigns = await Campaign.find().populate("organization", "name email");
  res.status(200).json(campaigns);
};

export const getCampaignById = async (req, res) => {
  const campaign = await Campaign.findById(req.params.id).populate("organization", "name email");
  if (!campaign) return res.status(404).json({ message: "Kampanya bulunamadı" });

  res.status(200).json(campaign);
};

export const updateCampaign = async (req, res) => {
  const { id } = req.params

  const existingCampaign = await Campaign.findById(id)
  
  if (!existingCampaign) {
    return res.status(404).json({ message: 'Kampanya bulunamadı.' });
  }

  let updateData = { ...req.body };

  const updatedCampaign = await Campaign.findByIdAndUpdate(id, updateData, {new: true})

  res.status(200).json(updatedCampaign);
};

export const deleteCampaign = async (req, res) => {
  const campaign = await Campaign.findByIdAndDelete(req.params.id);
  if (!campaign) return res.status(404).json({ message: "Kampanya bulunamadı" });
  res.status(200).json({ message: "Kampanya silindi" });
};
