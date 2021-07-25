# RestaurantApp

React Native project for MPMA module

## User Role

- Customer
- Counter
- Kitchen

## Functionality List

1. Customer

   - Login
   - Select food
   - Order food
   - Payment (simple way)
   - Check order summary after counter has confirmed the order

2. Counter

   - Receive food order from customer
   - Review the food order? Send the order to kitchen : Reject the order and send a notification with reason back to customer
   - Receive notification from kitchen to send waiter to the kitchen
   - Check order summary for every table
   - Update bill status for every table
   - Check bill history

3. Kitchen

   - Receive food order from counter
   - Proceed the food order
   - Update food status
   - Updating the order status (exp: on cooking, finished)
   - Send the order information to the counter once complete
   - Check or look back the past order

## Database Structure

1. users

   - userRole
   - userStatus
   - lastLogin

2. foods

   - foodName
   - foodPrice
   - foodImageUrl
   - foodStatus

3. orders

   - orderFoods(array of foodId)
   - orderCreatedTime
   - orderCompletedTime
   - orderTotal
   - orderStatus
   - userId

4. payments

   - paymentMethod
   - paymentStatus
   - paymentTimestamp
   - orderId

### Completed feature

1. Common

   - Login to different role
   - Register for different role (will be removed later)

2. Counter

3. Customer

4. Kitchen
