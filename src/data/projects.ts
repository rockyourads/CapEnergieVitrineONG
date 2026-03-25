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
    description: "Électrification du village de Sammueluang au Laos. Système solaire autonome pour fournir l'énergie aux habitants.",
    image: '/images/projects/village-sammueluang.jpg',
  },
  {
    id: '7-centres-medicaux-dominique',
    title: '7 Centres Médicaux',
    country: 'Dominique',
    countryCode: 'DM',
    client: 'Chrétien-Orient',
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
    description: "Installation solaire pour l'aéroport d'Amdjarass au Tchad. Système off-grid assurant l'alimentation électrique de l'infrastructure aéroportuaire.",
    image: '/images/projects/aeroport-amdjarass.jpg',
  },
  {
    id: 'pompage-kenya',
    title: 'Pompage solaire - Kenya',
    country: 'Kenya',
    countryCode: 'KE',
    client: 'Chrétien-Orient',
    clientType: 'ONG',
    category: 'Pompage solaire',
    description: "Système de pompage solaire au Kenya en partenariat avec l'Œuvre d'Orient (Chrétien-Orient). Accès à l'eau potable pour les communautés locales.",
    image: '/images/projects/pompage-kenya.jpg',
  },
  {
    id: 'pompage-madagascar',
    title: 'Pompage solaire - Madagascar',
    country: 'Madagascar',
    countryCode: 'MG',
    client: 'Chrétien-Orient',
    clientType: 'ONG',
    category: 'Pompage solaire',
    description: "Installation de pompage solaire à Madagascar avec Chrétien-Orient. Solution durable d'accès à l'eau pour les populations rurales.",
    image: '/images/projects/pompage-madagascar.jpg',
  },
  {
    id: 'pv-djibouti',
    title: 'Installation PV - Djibouti',
    country: 'Djibouti',
    countryCode: 'DJ',
    client: 'Chrétien-Orient',
    clientType: 'ONG',
    category: 'Site Isolé / Off Grid',
    description: "Installation photovoltaïque à Djibouti en partenariat avec Chrétien-Orient. Système off-grid pour les infrastructures humanitaires.",
    image: '/images/projects/pv-djibouti.jpg',
  },
  {
    id: 'sierra-leone-laser',
    title: 'Électrification - Sierra Leone',
    country: 'Sierra Leone',
    countryCode: 'SL',
    client: 'LASER',
    clientType: 'ONG',
    category: 'Site Isolé / Off Grid',
    description: "Projet d'électrification solaire en Sierra Leone avec l'association LASER. Fourniture d'énergie pour les communautés isolées.",
    image: '/images/projects/sierra-leone.jpg',
  },
  {
    id: 'senegal-esf',
    title: 'Électrification - Sénégal',
    country: 'Sénégal',
    countryCode: 'SN',
    client: 'Électriciens Sans Frontières',
    clientType: 'ONG',
    category: 'Site Isolé / Off Grid',
    description: "Projet d'électrification solaire au Sénégal en partenariat avec Électriciens Sans Frontières. Installation de systèmes solaires pour des bâtiments communautaires.",
    image: '/images/projects/senegal.jpg',
  },
  {
    id: 'niger-msf',
    title: 'Installation solaire - Niger',
    country: 'Niger',
    countryCode: 'NE',
    client: 'MSF',
    clientType: 'ONG',
    category: 'Site Isolé / Off Grid',
    description: "Installation photovoltaïque au Niger pour Médecins Sans Frontières. Alimentation solaire fiable pour les centres de santé en zone isolée.",
    image: '/images/projects/niger.jpg',
  },
  {
    id: 'guyane-esf',
    title: 'Électrification - Guyane',
    country: 'Guyane',
    countryCode: 'GF',
    client: 'Électriciens Sans Frontières',
    clientType: 'ONG',
    category: 'Site Isolé / Off Grid',
    description: "Projet d'électrification solaire en Guyane avec Électriciens Sans Frontières. Systèmes off-grid pour les villages isolés en forêt amazonienne.",
    image: '/images/projects/guyane.jpg',
  },
]

export const countries = [...new Set(projects.map(p => p.country))]
export const clients = [...new Set(projects.map(p => p.client))]
