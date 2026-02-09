export interface Project {
  id: string
  title: string
  country: string
  countryCode: string
  client: string
  clientType: string
  category: string
  description: string
  image: string
}

export const projects: Project[] = [
  {
    id: 'croix-rouge-cebu',
    title: 'Croix Rouge - Cebu',
    country: 'Philippines',
    countryCode: 'PH',
    client: 'Croix Rouge',
    clientType: 'ONG',
    category: 'Site Isolé / Off Grid',
    description: 'Installation photovoltaïque pour la Croix Rouge à Cebu, Philippines. Système off-grid fournissant une alimentation fiable pour les opérations humanitaires.',
    image: '/images/projects/croix-rouge-cebu.jpg',
  },
  {
    id: 'village-sammueluang',
    title: 'Village de Sammueluang',
    country: 'Laos',
    countryCode: 'LA',
    client: 'ONG locale',
    clientType: 'ONG',
    category: 'Site Isolé / Off Grid',
    description: 'Électrification du village de Sammueluang au Laos. Système solaire autonome pour fournir l\'énergie aux habitants.',
    image: '/images/projects/village-sammueluang.jpg',
  },
  {
    id: '7-centres-medicaux-dominique',
    title: '7 Centres Médicaux',
    country: 'Dominique',
    countryCode: 'DM',
    client: 'ONG Santé',
    clientType: 'ONG',
    category: 'Site Isolé / Off Grid',
    description: 'Installation de systèmes photovoltaïques pour 7 centres médicaux en Dominique. Alimentation solaire fiable pour les soins de santé en zones isolées.',
    image: '/images/projects/centres-medicaux-dominique.jpg',
  },
  {
    id: 'societe-generale-burkina',
    title: 'Banque Société Générale',
    country: 'Burkina Faso',
    countryCode: 'BF',
    client: 'Société Générale',
    clientType: 'Institutionnel',
    category: 'Autoconsommation',
    description: 'Système photovoltaïque en autoconsommation pour la Banque Société Générale au Burkina Faso. Réduction de la dépendance au réseau et des coûts énergétiques.',
    image: '/images/projects/societe-generale-burkina.jpg',
  },
  {
    id: 'aeroport-amdjarass',
    title: 'Aéroport Amdjarass',
    country: 'Tchad',
    countryCode: 'TD',
    client: 'Aéroportuaire',
    clientType: 'Institutionnel',
    category: 'Site Isolé',
    description: 'Installation solaire pour l\'aéroport d\'Amdjarass au Tchad. Système off-grid assurant l\'alimentation électrique de l\'infrastructure aéroportuaire.',
    image: '/images/projects/aeroport-amdjarass.jpg',
  },
]

export const countries = [...new Set(projects.map(p => p.country))]
export const clients = [...new Set(projects.map(p => p.client))]
