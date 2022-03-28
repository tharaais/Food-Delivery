
export class Profiles {
  public ID: string;
  public FirstName: string;
  public LastName: string;
  public Email: string;
  public Section: string;
  public Password: string;
  public Mobile: string;

  constructor() {
    this.ID = "";
    this.FirstName = "";
    this.LastName = "";
    this.Email = "";
    this.Section = "";
    this.Password = "";
    this.Mobile = "";
  }
}

export class Meals {
  public ID: string;
  public MealName: string;
  public Description: string;
  public Price: number;
  public Count: number;

  constructor() {
    this.ID = "";
    this.MealName = "";
    this.Description = "";
    this.Price = 0;
    this.Count = 0;
  }
}

export class Restaurants {
  public ID: string;
  public RestaurantName: string;
  public Address: string;
  public Phone: string;
  public Meals: Meals[];

  constructor() {
    this.ID = "";
    this.RestaurantName = "";
    this.Address = "";
    this.Phone = "";
    this.Meals = [];
  }
}


export class ShortProfile {
  public FullName: string;

  constructor() {
    this.FullName = "";
  }
}

export class Invitations {
  public ID: string;
  public InitiatorName: string;
  public PeopleGroup: string[];
  public RestaurantName: string;
  public Comment: string;
  public Accepted: boolean;
  public ExpiryTime: Date;

  constructor() {
    this.ID = "";
    this.InitiatorName = "";
    this.PeopleGroup = [];
    this.RestaurantName = "";
    this.Comment = "";
    this.Accepted = false;
    this.ExpiryTime = new Date("");
  }
}

export class MealsRequests {
  public ID: string;
  public PersonName: string;
  public Meal: Meals[];
  public Count: number;
  public TotalPrice: number;

  constructor() {
    this.ID = "";
    this.PersonName = "";
    this.Meal = [];
    this.Count = 0;
    this.TotalPrice = 0;
  }
}
