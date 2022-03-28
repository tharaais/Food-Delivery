export class Users {
  public id: string;
  public Email: string;
  public UserName: string;

  constructor() {
    this.id = "";
    this.Email = "";
    this.UserName = "";
  }
}

export class Person {
  public Id: Number;
  public UserId: string;
  public FirstName: string;
  public LastName: string;
  public Phone: string;
  public Mobile: string;
  public IsActive: boolean;

  constructor() {
    this.Id = 0;
    this.UserId = "";
    this.FirstName = "";
    this.LastName = "";
    this.Phone = "";
    this.Mobile = "";
    this.IsActive = false;
  }
}


export class Restaurant {
  public Id: string;
  public Name: string;
  public Address: string;
  public Phone: string;

  constructor() {
    this.Id = "";
    this.Name = "";
    this.Address = "";
    this.Phone = "";
  }
}


export class Meal
{
  public Id: number;
  public Name: string;
  public RestaurantId: number;
  public Description: string;
  public Price: number;

  constructor() {
    this.Id = 0;
    this.Name = "";
    this.RestaurantId = 0;
    this.Description = "";
    this.Price = 0;
  }
}



export class vmMeal extends Meal
{
  public RestaurantName: string;

  constructor() {
    super();
    this.RestaurantName = "";
  }
}


export class Initiative {
  public Id: string;
  public InitiatorId: number;
  public RestaurantId: number;
  public DayOfInitiative: Date;
  public ExpectedCallTime: Date;

  constructor() {
    this.Id = "";
    this.InitiatorId = 0;
    this.RestaurantId = 0;
    this.DayOfInitiative = new Date("");
    this.ExpectedCallTime = new Date("");
  }
}


export class vmInitiative extends Initiative
{
  public InitiatorName: string;
  public RestaurantName: string;

  constructor() {
    super();
    this.InitiatorName = "";
    this.RestaurantName = "";
  }
}


export class Invitation
{
  public Id: number;
  public PersonId: number;
  public InitiativeId: number;
  public Comment: string;
  public IsAccepted: boolean;
  public SeenAt: Date;

  constructor() {
    this.Id = 0;
    this.PersonId = 0;
    this.InitiativeId = 0;
    this.Comment = "";
    this.IsAccepted = false;
    this.SeenAt = new Date("");
  }
}


export class vmInvitation extends Invitation {
  public PersonName: string;
  public InitiatorName: string;

  constructor() {
    super();
    this.PersonName = "";
    this.InitiatorName = "";
  }
}



export class MealRequest
{
  public Id: number;
  public PersonId: number;
  public InitiativeId: number;
  public MealId: number;
  public Count: number;

  constructor() {
    this.Id = 0;
    this.PersonId = 0;
    this.InitiativeId = 0;
    this.MealId = 0;
    this.Count = 0;
  }
}


export class vmMealRequest extends MealRequest {
  public PersonName: string;
  public MealName: string;
  public Price: number;
  public TotalPrice: number;

  constructor() {
    super();
    this.PersonName = "";
    this.MealName = "";
    this.Price = 0;
    this.TotalPrice = 0;
  }
}
