export interface Provider {
    _id: string;
    name: string;
    img: string[];
    desc: string;
    contact: {
      phone: string;
      email: string;
      address: string;
    };
    tags: string[];
    other: string;
  }