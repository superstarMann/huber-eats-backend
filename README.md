<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

## User Entity:
- id
- createdAt
- updatedAt

- email
- password
- role(client|owner|delivery) <!-- role : 배고픈 사람 | owner: 주방장 | delivery : 배달원 -->

## User CRUD:
- Create Account
- Log In
- See Profile
- Edit Profile
- Verify Email

- See Categories
- See Store by Category (pagination)
- See Store (pagination)
- See Store

- Edit Store
- Delete Store

- Create Dish
- Edit Dish
- Delete Dish

- Orders Subscription: 
 - Pending Orders (s: newOrder) (t: createOrder(newOrder))
 - Order Status (Customer, Delivery, Owner) (s: orderUpdate) (t: editOrder (orderUpdate))
 - Pending Pickup ORder (Delivery) (s: orderUpdate) (t: editOrder (orderUpdate))

-Payments (CRON)