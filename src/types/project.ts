export interface Project {
  _id: string;
  nameEn: string;
  nameAr: string;
  slug: {
    current: string;
  };
  image: {
    _type: 'image';
    asset: {
      _ref: string;
      _type: 'reference';
    };
  };
  location: string;
  projectDescriptionEN: string;
  projectDescriptionAR: string;
  order?: number;
  category: 'residential' | 'commercial' | 'mall' | 'compound';
  client: string;
}