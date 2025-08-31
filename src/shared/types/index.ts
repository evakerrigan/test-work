export interface Organization {
  id: number;
  title: string;
  agreementNumber: string;
  agreementDay: string;
  businessEntity: string;
  companyType: string;
  responsiblePerson: string;
  phone: string;
  email: string;
  photos: string[];
}

export type CompanyTypeCode =
  | 'funeral_home'
  | 'logistics_services'
  | 'burial_care_contractor';
