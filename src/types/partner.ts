// src/types/partner.ts
export interface Partner {
    _id: string;
    name: string;
    nameAr: string;
    logo: {
      _type: 'image';
      asset?: {
        _ref: string;
        _type: 'reference';
      };
      _upload?: {
        previewImage: string;
        file: {
          name: string;
        };
      };
    };
    descriptionEn: string;
    descriptionAr: string;
    order?: number;
  }