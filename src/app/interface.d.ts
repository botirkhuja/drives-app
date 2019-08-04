declare module DriverI {
  interface Info {
    car: string;
    cell: string;
    name: string;
    role: Partial<Role>;
  }

  interface Role {
    admin: boolean;
    driver: boolean;
  }
}
