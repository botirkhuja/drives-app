declare module DriverI {
  interface Info extends Cell {
    car: string;
    name: string;
    role: Partial<Role>;
    commission: number;
  }

  interface Cell {
    cell: string;
  }

  interface Role {
    admin: boolean;
    driver: boolean;
  }

  interface List {
    drivers: Info[]
  }
}

declare module TripI {
  interface Info {
    pickupDate: Date;
    pickup: string;
    dropoff: string;
    cell: string;
    price: number;
    driverID: string;
    tollIncluded: boolean;
    tollAmount: number;
    id: string;
    commissioned: boolean;
    driverName?: string;
  }

  interface List {
    trips: Info[]
  }
}

interface NavigatableLink {
  link: string;
  label: string;
}
