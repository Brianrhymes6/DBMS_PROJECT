export interface PetItem {
  pet_id: string;
  name: string;
  breed: string;
  age: number;
  gender: string;
  category: string;
  shelter: string;
  status: 'Adopted' | 'Available' | 'Pending';
}

export interface ShelterItem {
  shelter_id: string;
  shelter_name: string;
  location: string;
  contact: string;
  pets?: string[];
  donation_total: number;
}

export interface AdoptionItem {
  adoption_id: string;
  adopter: string;
  pet: string;
  application_date: string;
  status: 'Approved' | 'Pending' | 'Rejected';
}

export interface VolunteerItem {
  volunteer_id: string;
  name: string;
  phone: string;
  experience: string;
}

export interface DonationItem {
  donation_id: string;
  donor: string;
  shelter: string;
  amount: number;
  donation_date: string;
}

export interface RescueItem {
  rescue_id: string;
  pet: string;
  rescue_location: string;
  rescue_date: string;
  volunteers: string[];
}

// 1. Pets (8 records - matching reference screenshots)
export const samplePets: PetItem[] = [
  { pet_id: '101', name: 'Bruno', breed: 'Labrador', age: 2, gender: 'Male', category: 'Dog', shelter: 'Happy Paws Shelter', status: 'Adopted' },
  { pet_id: '102', name: 'Milo', breed: 'Persian', age: 1, gender: 'Male', category: 'Cat', shelter: 'Happy Paws Shelter', status: 'Adopted' },
  { pet_id: '103', name: 'Rocky', breed: 'Indie', age: 3, gender: 'Male', category: 'Dog', shelter: 'Happy Paws Shelter', status: 'Adopted' },
  { pet_id: '104', name: 'Lucky', breed: 'Indie', age: 1, gender: 'Male', category: 'Dog', shelter: 'Happy Paws Shelter', status: 'Available' },
  { pet_id: '105', name: 'tomy', breed: 'Indie', age: 2, gender: 'Male', category: 'Dog', shelter: 'Animal Care Shelter', status: 'Available' },
  { pet_id: '106', name: 'sravy', breed: 'Persian', age: 1, gender: 'Female', category: 'Cat', shelter: 'Hope Animal Shelter', status: 'Available' },
  { pet_id: '107', name: 'Bella', breed: 'Golden Retriever', age: 4, gender: 'Female', category: 'Dog', shelter: 'Blue Cross Sanctuary', status: 'Available' },
  { pet_id: '108', name: 'Max', breed: 'Beagle', age: 2, gender: 'Male', category: 'Dog', shelter: 'Paws & Claws Haven', status: 'Pending' },
];

// 2. Shelters (6 records)
export const sampleShelters: ShelterItem[] = [
  { shelter_id: '1', shelter_name: 'Happy Paws Shelter', location: 'Chennai', contact: '9876543210', pets: ['101', '102', '103', '104'], donation_total: 12000 },
  { shelter_id: '2', shelter_name: 'Animal Care Shelter', location: 'Tambaram', contact: '9876501234', pets: ['105'], donation_total: 4500 },
  { shelter_id: '3', shelter_name: 'Hope Animal Shelter', location: 'Velachery', contact: '9876512345', pets: ['106'], donation_total: 6000 },
  { shelter_id: '4', shelter_name: 'Blue Cross Sanctuary', location: 'Guindy', contact: '9876523456', pets: ['107'], donation_total: 2500 },
  { shelter_id: '5', shelter_name: 'Paws & Claws Haven', location: 'Adyar', contact: '9876534567', pets: ['108'], donation_total: 4000 },
  { shelter_id: '6', shelter_name: 'Compassion Pet Rescue', location: 'Anna Nagar', contact: '9876545678', pets: [], donation_total: 3000 },
];

// 3. Adoption Applications (7 records)
export const sampleAdoptions: AdoptionItem[] = [
  { adoption_id: 'A101', adopter: 'Arun Kumar', pet: 'Bruno', application_date: '2026-10-01', status: 'Approved' },
  { adoption_id: 'A102', adopter: 'Kiran Sharma', pet: 'Milo', application_date: '2026-10-05', status: 'Approved' },
  { adoption_id: 'A103', adopter: 'Rahul Verma', pet: 'Rocky', application_date: '2026-10-08', status: 'Approved' },
  { adoption_id: 'A104', adopter: 'Priya Nair', pet: 'Lucky', application_date: '2026-10-12', status: 'Pending' },
  { adoption_id: 'A105', adopter: 'Ananya Rao', pet: 'tomy', application_date: '2026-10-15', status: 'Pending' },
  { adoption_id: 'A106', adopter: 'Siddharth Roy', pet: 'Max', application_date: '2026-10-17', status: 'Pending' },
  { adoption_id: 'A107', adopter: 'Priya Nair', pet: 'sravy', application_date: '2026-10-18', status: 'Rejected' },
];

// 4. Volunteers (6 records)
export const sampleVolunteers: VolunteerItem[] = [
  { volunteer_id: '1', name: 'Ravi Shankar', phone: '9876543211', experience: '2 years' },
  { volunteer_id: '2', name: 'Kumaravel M', phone: '9876543212', experience: '3 years' },
  { volunteer_id: '3', name: 'Sneha Reddy', phone: '9876543213', experience: '4 years' },
  { volunteer_id: '4', name: 'Vikram Sen', phone: '9876543214', experience: '1 year' },
  { volunteer_id: '5', name: 'Deepa Swaminathan', phone: '9876543215', experience: '5 years' },
  { volunteer_id: '6', name: 'Manoj Krishnan', phone: '9876543216', experience: '2 years' },
];

// 5. Donations (8 records)
export const sampleDonations: DonationItem[] = [
  { donation_id: 'D101', donor: 'Rahul Verma', shelter: 'Happy Paws Shelter', amount: 5000, donation_date: '2026-10-02' },
  { donation_id: 'D102', donor: 'Kiran Sharma', shelter: 'Animal Care Shelter', amount: 4500, donation_date: '2026-10-06' },
  { donation_id: 'D103', donor: 'Arjun Patel', shelter: 'Happy Paws Shelter', amount: 7000, donation_date: '2026-10-10' },
  { donation_id: 'D104', donor: 'Meera Iyer', shelter: 'Hope Animal Shelter', amount: 3500, donation_date: '2026-10-12' },
  { donation_id: 'D105', donor: 'Arun Kumar', shelter: 'Blue Cross Sanctuary', amount: 2500, donation_date: '2026-10-14' },
  { donation_id: 'D106', donor: 'Arjun Patel', shelter: 'Paws & Claws Haven', amount: 4000, donation_date: '2026-10-16' },
  { donation_id: 'D107', donor: 'Meera Iyer', shelter: 'Compassion Pet Rescue', amount: 3000, donation_date: '2026-10-18' },
  { donation_id: 'D108', donor: 'Rahul Verma', shelter: 'Hope Animal Shelter', amount: 2500, donation_date: '2026-10-20' },
];

// 6. Rescue Events (7 records)
export const sampleRescues: RescueItem[] = [
  { rescue_id: 'R101', pet: 'Bruno', rescue_location: 'Marina Beach, Chennai', rescue_date: '2026-09-10', volunteers: ['Ravi Shankar'] },
  { rescue_id: 'R102', pet: 'Milo', rescue_location: 'Tambaram Railway Colony', rescue_date: '2026-09-14', volunteers: ['Kumaravel M'] },
  { rescue_id: 'R103', pet: 'Rocky', rescue_location: 'Velachery Main Road', rescue_date: '2026-09-18', volunteers: ['Sneha Reddy'] },
  { rescue_id: 'R104', pet: 'Lucky', rescue_location: 'Guindy Industrial Estate', rescue_date: '2026-09-22', volunteers: ['Vikram Sen'] },
  { rescue_id: 'R105', pet: 'tomy', rescue_location: 'Besant Nagar Beach', rescue_date: '2026-09-25', volunteers: ['Ravi Shankar'] },
  { rescue_id: 'R106', pet: 'sravy', rescue_location: 'Anna Nagar Tower Park', rescue_date: '2026-09-28', volunteers: ['Deepa Swaminathan'] },
  { rescue_id: 'R107', pet: 'Bella', rescue_location: 'Adyar River Bank', rescue_date: '2026-10-02', volunteers: ['Manoj Krishnan'] },
];

// 7. Users (8 records)
export const sampleUsers = [
  { user_id: '1', name: 'Arun Kumar', email: 'arun@gmail.com', phone: '9876543201', address: 'Chennai', role: 'Adopter' },
  { user_id: '2', name: 'Kiran Sharma', email: 'kiran@gmail.com', phone: '9876543202', address: 'Tambaram', role: 'Adopter' },
  { user_id: '3', name: 'Rahul Verma', email: 'rahul@gmail.com', phone: '9876543203', address: 'Chennai', role: 'Donor' },
  { user_id: '4', name: 'Priya Nair', email: 'priya@gmail.com', phone: '9876543204', address: 'Velachery', role: 'Adopter' },
  { user_id: '5', name: 'Ananya Rao', email: 'ananya@gmail.com', phone: '9876543205', address: 'Adyar', role: 'Adopter' },
  { user_id: '6', name: 'Arjun Patel', email: 'arjun@gmail.com', phone: '9876543206', address: 'Anna Nagar', role: 'Donor' },
  { user_id: '7', name: 'Meera Iyer', email: 'meera@gmail.com', phone: '9876543207', address: 'Guindy', role: 'Donor' },
  { user_id: '8', name: 'Siddharth Roy', email: 'siddharth@gmail.com', phone: '9876543208', address: 'Chennai', role: 'Adopter' },
];

// 8. Pet Categories (6 records)
export const sampleCategories = [
  { category_id: '1', category_name: 'Dog' },
  { category_id: '2', category_name: 'Cat' },
  { category_id: '3', category_name: 'Rabbit' },
  { category_id: '4', category_name: 'Bird' },
  { category_id: '5', category_name: 'Small Mammal' },
  { category_id: '6', category_name: 'Reptile' },
];

// Complete Graph dataset for Cytoscape visualization
export const sampleGraphData = {
  nodes: [
    ...samplePets.map((p) => ({ id: `pet_${p.pet_id}`, label: 'Pet', properties: p })),
    ...sampleShelters.map((s) => ({ id: `shelter_${s.shelter_id}`, label: 'Shelter', properties: s })),
    ...sampleUsers.map((u) => ({ id: `user_${u.user_id}`, label: 'User', properties: u })),
    ...sampleVolunteers.map((v) => ({ id: `volunteer_${v.volunteer_id}`, label: 'Volunteer', properties: v })),
    ...sampleCategories.map((c) => ({ id: `cat_${c.category_id}`, label: 'PetCategory', properties: c })),
    ...sampleAdoptions.map((a) => ({ id: `adopt_${a.adoption_id}`, label: 'Adoption', properties: a })),
    ...sampleRescues.map((r) => ({ id: `rescue_${r.rescue_id}`, label: 'RescueEvent', properties: r })),
    ...sampleDonations.map((d) => ({ id: `donation_${d.donation_id}`, label: 'Donation', properties: d })),
  ],
  relationships: [
    // Pet -> Shelter
    { source: 'pet_101', target: 'shelter_1', label: 'HOUSED_AT' },
    { source: 'pet_102', target: 'shelter_1', label: 'HOUSED_AT' },
    { source: 'pet_103', target: 'shelter_1', label: 'HOUSED_AT' },
    { source: 'pet_104', target: 'shelter_1', label: 'HOUSED_AT' },
    { source: 'pet_105', target: 'shelter_2', label: 'HOUSED_AT' },
    { source: 'pet_106', target: 'shelter_3', label: 'HOUSED_AT' },
    { source: 'pet_107', target: 'shelter_4', label: 'HOUSED_AT' },
    { source: 'pet_108', target: 'shelter_5', label: 'HOUSED_AT' },

    // Pet -> Category
    { source: 'pet_101', target: 'cat_1', label: 'BELONGS_TO' },
    { source: 'pet_102', target: 'cat_2', label: 'BELONGS_TO' },
    { source: 'pet_103', target: 'cat_1', label: 'BELONGS_TO' },
    { source: 'pet_104', target: 'cat_1', label: 'BELONGS_TO' },
    { source: 'pet_105', target: 'cat_1', label: 'BELONGS_TO' },
    { source: 'pet_106', target: 'cat_2', label: 'BELONGS_TO' },
    { source: 'pet_107', target: 'cat_1', label: 'BELONGS_TO' },
    { source: 'pet_108', target: 'cat_1', label: 'BELONGS_TO' },

    // Adoption applications
    { source: 'user_1', target: 'adopt_A101', label: 'APPLIED_FOR' },
    { source: 'adopt_A101', target: 'pet_101', label: 'FOR_PET' },
    { source: 'user_2', target: 'adopt_A102', label: 'APPLIED_FOR' },
    { source: 'adopt_A102', target: 'pet_102', label: 'FOR_PET' },
    { source: 'user_3', target: 'adopt_A103', label: 'APPLIED_FOR' },
    { source: 'adopt_A103', target: 'pet_103', label: 'FOR_PET' },
    { source: 'user_4', target: 'adopt_A104', label: 'APPLIED_FOR' },
    { source: 'adopt_A104', target: 'pet_104', label: 'FOR_PET' },
    { source: 'user_5', target: 'adopt_A105', label: 'APPLIED_FOR' },
    { source: 'adopt_A105', target: 'pet_105', label: 'FOR_PET' },
    { source: 'user_8', target: 'adopt_A106', label: 'APPLIED_FOR' },
    { source: 'adopt_A106', target: 'pet_108', label: 'FOR_PET' },
    { source: 'user_4', target: 'adopt_A107', label: 'APPLIED_FOR' },
    { source: 'adopt_A107', target: 'pet_106', label: 'FOR_PET' },

    // Rescue events
    { source: 'volunteer_1', target: 'rescue_R101', label: 'PARTICIPATED_IN' },
    { source: 'rescue_R101', target: 'pet_101', label: 'RESCUED' },
    { source: 'volunteer_2', target: 'rescue_R102', label: 'PARTICIPATED_IN' },
    { source: 'rescue_R102', target: 'pet_102', label: 'RESCUED' },
    { source: 'volunteer_3', target: 'rescue_R103', label: 'PARTICIPATED_IN' },
    { source: 'rescue_R103', target: 'pet_103', label: 'RESCUED' },
    { source: 'volunteer_4', target: 'rescue_R104', label: 'PARTICIPATED_IN' },
    { source: 'rescue_R104', target: 'pet_104', label: 'RESCUED' },
    { source: 'volunteer_1', target: 'rescue_R105', label: 'PARTICIPATED_IN' },
    { source: 'rescue_R105', target: 'pet_105', label: 'RESCUED' },
    { source: 'volunteer_5', target: 'rescue_R106', label: 'PARTICIPATED_IN' },
    { source: 'rescue_R106', target: 'pet_106', label: 'RESCUED' },
    { source: 'volunteer_6', target: 'rescue_R107', label: 'PARTICIPATED_IN' },
    { source: 'rescue_R107', target: 'pet_107', label: 'RESCUED' },

    // Donations
    { source: 'user_3', target: 'donation_D101', label: 'DONATED' },
    { source: 'donation_D101', target: 'shelter_1', label: 'DONATED_TO' },
    { source: 'user_2', target: 'donation_D102', label: 'DONATED' },
    { source: 'donation_D102', target: 'shelter_2', label: 'DONATED_TO' },
    { source: 'user_6', target: 'donation_D103', label: 'DONATED' },
    { source: 'donation_D103', target: 'shelter_1', label: 'DONATED_TO' },
    { source: 'user_7', target: 'donation_D104', label: 'DONATED' },
    { source: 'donation_D104', target: 'shelter_3', label: 'DONATED_TO' },
    { source: 'user_1', target: 'donation_D105', label: 'DONATED' },
    { source: 'donation_D105', target: 'shelter_4', label: 'DONATED_TO' },
    { source: 'user_6', target: 'donation_D106', label: 'DONATED' },
    { source: 'donation_D106', target: 'shelter_5', label: 'DONATED_TO' },
    { source: 'user_7', target: 'donation_D107', label: 'DONATED' },
    { source: 'donation_D107', target: 'shelter_6', label: 'DONATED_TO' },
    { source: 'user_3', target: 'donation_D108', label: 'DONATED' },
    { source: 'donation_D108', target: 'shelter_3', label: 'DONATED_TO' },
  ],
};

export const sampleDashboardStats = {
  pets: samplePets.length,
  available: samplePets.filter((p) => p.status === 'Available').length,
  adopted: samplePets.filter((p) => p.status === 'Adopted').length,
  applications: sampleAdoptions.length,
  pending: sampleAdoptions.filter((a) => a.status === 'Pending').length,
  volunteers: sampleVolunteers.length,
  rescues: sampleRescues.length,
  shelters: sampleShelters.length,
  donations: sampleDonations.length,
  donation_total: sampleDonations.reduce((sum, d) => sum + d.amount, 0),
};
