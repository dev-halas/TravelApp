import mongoose from 'mongoose';

interface EmergencyNumbers {
  police: string;
  ambulance: string;
  fire: string;
}

interface HistoricalTemperature {
  year: string;
  average_monthly_temperatures: number[];
}

interface CulturalCustom {
  title: string;
  description: string;
}

interface ThingToBeAwareOf {
  title: string;
  description: string;
}

interface Country {
  id: number;
  name: string;
  continent: string;
  emergency_numbers: EmergencyNumbers;
  historical_temperatures: HistoricalTemperature[];
  things_to_pack: string[];
  places_to_visit: string[];
  cultural_customs: CulturalCustom[];
  things_to_be_aware_of_in_country: ThingToBeAwareOf[];
  national_dishes: string[];
  religion: string;
  recommended_clothing: string;
}

const emergencyNumbersSchema = new mongoose.Schema<EmergencyNumbers>({
  police: { type: String, required: true },
  ambulance: { type: String, required: true },
  fire: { type: String, required: true },
});

const historicalTemperatureSchema = new mongoose.Schema<HistoricalTemperature>({
  year: { type: String, required: true },
  average_monthly_temperatures: [{ type: Number }],
});

const culturalCustomSchema = new mongoose.Schema<CulturalCustom>({
  title: { type: String, required: true },
  description: { type: String, required: true },
});

const thingToBeAwareOfSchema = new mongoose.Schema<ThingToBeAwareOf>({
  title: { type: String, required: true },
  description: { type: String, required: true },
});

const countrySchema = new mongoose.Schema<Country>({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  continent: { type: String, required: true },
  emergency_numbers: { type: emergencyNumbersSchema, required: true },
  historical_temperatures: [historicalTemperatureSchema],
  things_to_pack: [{ type: String }],
  places_to_visit: [{ type: String }],
  cultural_customs: [culturalCustomSchema],
  things_to_be_aware_of_in_country: [thingToBeAwareOfSchema],
  national_dishes: [{ type: String }],
  religion: { type: String, required: true },
  recommended_clothing: { type: String, required: true },
});

const CountryModel = mongoose.model<Country>('Country', countrySchema);

export default CountryModel;
