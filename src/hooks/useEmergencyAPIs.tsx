import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export function useEmergencyAPIs() {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // National Weather Service API
  const getWeatherAlerts = async (lat: number, lon: number) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.weather.gov/alerts/active?point=${lat},${lon}`
      );
      const data = await response.json();
      
      return {
        alerts: data.features?.map((alert: any) => ({
          id: alert.id,
          title: alert.properties.headline,
          description: alert.properties.description,
          severity: alert.properties.severity,
          urgency: alert.properties.urgency,
          certainty: alert.properties.certainty,
          onset: alert.properties.onset,
          expires: alert.properties.expires,
          areas: alert.properties.areaDesc,
          instruction: alert.properties.instruction
        })) || [],
        total: data.features?.length || 0
      };
    } catch (error) {
      console.error('Weather alerts error:', error);
      toast({
        title: "Alert Error",
        description: "Unable to fetch weather alerts at this time",
        variant: "destructive"
      });
      return { alerts: [], total: 0 };
    } finally {
      setLoading(false);
    }
  };

  // FEMA API for disaster information
  const getDisasterInfo = async (state?: string) => {
    setLoading(true);
    try {
      const stateParam = state ? `?$filter=state eq '${state}'` : '';
      const response = await fetch(
        `https://www.fema.gov/api/open/v2/DisasterDeclarationsSummaries${stateParam}&$top=20`
      );
      const data = await response.json();
      
      return {
        disasters: data.DisasterDeclarationsSummaries?.map((disaster: any) => ({
          id: disaster.disasterNumber,
          title: disaster.title,
          state: disaster.state,
          county: disaster.designatedArea,
          type: disaster.incidentType,
          declared: disaster.declarationDate,
          status: disaster.declarationTitle,
          description: disaster.title
        })) || [],
        total: data.metadata?.count || 0
      };
    } catch (error) {
      console.error('FEMA disaster info error:', error);
      toast({
        title: "Disaster Info Error",
        description: "Unable to fetch disaster information at this time",
        variant: "destructive"
      });
      return { disasters: [], total: 0 };
    } finally {
      setLoading(false);
    }
  };

  // First Aid information (static data for demo)
  const getFirstAidInfo = async (emergency: string) => {
    setLoading(true);
    
    const firstAidData: Record<string, any> = {
      'choking': {
        title: 'Choking Emergency',
        steps: [
          'Encourage coughing if person is conscious and able',
          'If unable to cough, perform 5 back blows between shoulder blades',
          'If ineffective, perform 5 abdominal thrusts (Heimlich maneuver)',
          'Alternate between back blows and abdominal thrusts',
          'Call emergency services if object not dislodged'
        ],
        warnings: ['Do not perform abdominal thrusts on pregnant women or infants'],
        emergency_number: '911'
      },
      'burn': {
        title: 'Burn Treatment',
        steps: [
          'Remove from heat source immediately',
          'Cool burn with cool (not cold) running water for 10-20 minutes',
          'Remove jewelry or clothing before swelling occurs',
          'Cover with sterile, non-adhesive bandage',
          'Do not apply ice, butter, or ointments'
        ],
        warnings: ['Seek immediate medical attention for severe burns'],
        emergency_number: '911'
      },
      'bleeding': {
        title: 'Severe Bleeding',
        steps: [
          'Apply direct pressure to wound with clean cloth',
          'Elevate injured area above heart level if possible',
          'Do not remove objects embedded in wound',
          'Add more layers if blood soaks through',
          'Apply pressure to pressure points if bleeding continues'
        ],
        warnings: ['Call emergency services for severe bleeding'],
        emergency_number: '911'
      }
    };
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
      const info = firstAidData[emergency.toLowerCase()] || {
        title: 'General Emergency',
        steps: ['Stay calm', 'Assess the situation', 'Call emergency services if needed'],
        warnings: ['When in doubt, call 911'],
        emergency_number: '911'
      };
      
      return { success: true, info };
    } catch (error) {
      console.error('First aid info error:', error);
      return { success: false, message: 'Unable to retrieve first aid information' };
    } finally {
      setLoading(false);
    }
  };

  // Emergency contacts and poison control
  const getEmergencyContacts = async (location?: string) => {
    setLoading(true);
    
    const emergencyData = {
      national: [
        { name: 'Emergency Services', number: '911', description: 'Police, Fire, Medical Emergency' },
        { name: 'Poison Control', number: '1-800-222-1222', description: '24/7 Poison Help' },
        { name: 'National Suicide Prevention Lifeline', number: '988', description: 'Mental health crisis support' },
        { name: 'Crisis Text Line', number: 'Text HOME to 741741', description: 'Text-based crisis support' }
      ],
      local: location ? [
        { name: `${location} Emergency Services`, number: '911', description: 'Local emergency response' },
        { name: `${location} Non-Emergency Police`, number: '(555) 123-4567', description: 'Non-emergency police line' }
      ] : []
    };
    
    try {
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
      return { success: true, contacts: emergencyData };
    } catch (error) {
      console.error('Emergency contacts error:', error);
      return { success: false, message: 'Unable to retrieve emergency contacts' };
    } finally {
      setLoading(false);
    }
  };

  return {
    getWeatherAlerts,
    getDisasterInfo,
    getFirstAidInfo,
    getEmergencyContacts,
    loading
  };
}