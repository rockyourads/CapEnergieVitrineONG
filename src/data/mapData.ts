export interface MapPoint {
  country: string
  countryEn: string
  lat: number
  lon: number
  organizations: string[]
}

export const mapPoints: MapPoint[] = [
  {
    country: 'Philippines',
    countryEn: 'Philippines',
    lat: 14.5,
    lon: 121,
    organizations: ['Croix Rouge'],
  },
  {
    country: 'Laos',
    countryEn: 'Laos',
    lat: 18,
    lon: 103,
    organizations: ['ONG locale'],
  },
  {
    country: 'Dominique',
    countryEn: 'Dominica',
    lat: 15.4,
    lon: -61.4,
    organizations: ['Chrétien-Orient'],
  },
  {
    country: 'Burkina Faso',
    countryEn: 'Burkina Faso',
    lat: 12.4,
    lon: -1.5,
    organizations: ['Société Générale'],
  },
  {
    country: 'Tchad',
    countryEn: 'Chad',
    lat: 12.1,
    lon: 15.1,
    organizations: ['Infrastructure aéroportuaire'],
  },
  {
    country: 'Kenya',
    countryEn: 'Kenya',
    lat: -1.3,
    lon: 36.8,
    organizations: ['Chrétien-Orient'],
  },
  {
    country: 'Madagascar',
    countryEn: 'Madagascar',
    lat: -18.9,
    lon: 47.5,
    organizations: ['Chrétien-Orient'],
  },
  {
    country: 'Djibouti',
    countryEn: 'Djibouti',
    lat: 11.6,
    lon: 43,
    organizations: ['Chrétien-Orient'],
  },
  {
    country: 'Sierra Leone',
    countryEn: 'Sierra Leone',
    lat: 8.5,
    lon: -13.2,
    organizations: ['LASER'],
  },
  {
    country: 'Sénégal',
    countryEn: 'Senegal',
    lat: 14.7,
    lon: -17.5,
    organizations: ['Électriciens Sans Frontières'],
  },
  {
    country: 'Niger',
    countryEn: 'Niger',
    lat: 13.5,
    lon: 2.1,
    organizations: ['MSF'],
  },
  {
    country: 'Guyane',
    countryEn: 'French Guiana',
    lat: 4.9,
    lon: -52.3,
    organizations: ['Électriciens Sans Frontières'],
  },
]
