import axios from "axios";
import { useEffect, useState } from "react";

export default function CampagneList() {
  const [campaigns, setCampaigns] = useState<IPromotionCreatePayload[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadCampagnes = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get<IPromotionCreatePayload[]>(
          import.meta.env.VITE_API_URL + 'campagnes'
        );
        setCampaigns(response.data);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };
    loadCampagnes();
  }, []);

  if (isLoading) {
    return <div>loading....</div>;
  }

  if (error) {
    return (
      <div>
        <span>Error while loading campaigns</span>
      </div>
    );
  }

  return (
    <div>
      {campaigns.map((campaign) => (
        <div key={campaign.name}>
          <span>{campaign.name}</span>
          <span>{campaign.description}</span>
          <span>{campaign.startAt}</span>
          <span>{campaign.endAt}</span>
        </div>
      ))}
    </div>
  );
}
