export type VehicleStatus = 'Available' | 'Pending' | 'Sold' | 'Draft';

export type Vehicle = {
  id: string;
  slug: string;
  year: number;
  make: string;
  model: string;
  trim: string;
  price: number;
  mileage: number;
  body: string;
  status: VehicleStatus;
  stock: string;
  vin: string;
  color: string;
  image: string;
  images: string[];
  featured?: boolean;
  downPayment?: number;
};

export const vehicles: Vehicle[] = [
  {
    id: 'v1', slug: '2021-toyota-camry-se', year: 2021, make: 'Toyota', model: 'Camry', trim: 'SE', price: 24995,
    mileage: 48210, body: 'Sedan', status: 'Available', stock: 'SM-2418', vin: '4T1G11AK2MU000241', color: 'Celestial Silver',
    image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&w=1200&q=85',
    images: ['https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&w=1200&q=85', 'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&w=1200&q=85'], featured: true,
  },
  {
    id: 'v2', slug: '2020-honda-cr-v-ex', year: 2020, make: 'Honda', model: 'CR-V', trim: 'EX', price: 26995,
    mileage: 53670, body: 'SUV', status: 'Available', stock: 'SM-2409', vin: '2HKRW2H55LH000802', color: 'Platinum White',
    image: 'https://images.unsplash.com/photo-1568844293986-8c52b62e3d4d?auto=format&fit=crop&w=1200&q=85',
    images: ['https://images.unsplash.com/photo-1568844293986-8c52b62e3d4d?auto=format&fit=crop&w=1200&q=85'], featured: true, downPayment: 3995,
  },
  {
    id: 'v3', slug: '2019-ford-f-150-xlt', year: 2019, make: 'Ford', model: 'F-150', trim: 'XLT', price: 32995,
    mileage: 71402, body: 'Truck', status: 'Available', stock: 'SM-2388', vin: '1FTEW1EP7KFA10031', color: 'Oxford White',
    image: 'https://images.unsplash.com/photo-1551830820-330a71b99659?auto=format&fit=crop&w=1200&q=85',
    images: ['https://images.unsplash.com/photo-1551830820-330a71b99659?auto=format&fit=crop&w=1200&q=85'], featured: true,
  },
  {
    id: 'v4', slug: '2022-nissan-altima-sr', year: 2022, make: 'Nissan', model: 'Altima', trim: 'SR', price: 22995,
    mileage: 39102, body: 'Sedan', status: 'Pending', stock: 'SM-2421', vin: '1N4BL4CV0NN000114', color: 'Super Black',
    image: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=1200&q=85',
    images: ['https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=1200&q=85'],
  },
  {
    id: 'v5', slug: '2018-chevrolet-tahoe-lt', year: 2018, make: 'Chevrolet', model: 'Tahoe', trim: 'LT', price: 28995,
    mileage: 89201, body: 'SUV', status: 'Sold', stock: 'SM-2350', vin: '1GNSKBKC1JR000452', color: 'Black',
    image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1200&q=85',
    images: ['https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1200&q=85'],
  },
];

export const money = (value: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value);
export const miles = (value: number) => `${new Intl.NumberFormat('en-US').format(value)} mi`;
