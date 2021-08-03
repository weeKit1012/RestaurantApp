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
   - Check if the order is rejected

2. Counter

   - Receive food order from customer
   - Review the food order? Send the order to kitchen : Reject the order and send a notification with reason back to customer
   - ~~Receive notification from kitchen to send waiter to the kitchen~~
   - Check order summary for every table (Can cancel the order as well)
   - Update bill status for every table
   - Check bill history
   - Add, remove, update food in food menu

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
   - userStatus (1 by default, 0 = banned; 1 = available)
   - lastLogin
   - table (if userRole is customer)

2. foods

   - foodName
   - foodPrice
   - foodImageUrl
   - foodStatus (0 = unavailable; 1 = available)
   - foodPopularity

3. orders

   - orderFoods(array of foodId)
   - orderCreatedTime
   - orderCompletedTime
   - orderTotal
   - orderStatus (0 by default, 0 = pending; 1 = confirmed by counter; 2 = completed by kitchen; 3 = Done by counter; 4 = rejected)
   - userId
   - rejectReason

4. payments

   - paymentMethod (Card, Cash, E-wallet)
   - paymentStatus (0 by default, 0 = pending; 1 = Success)
   - paymentTimestamp
   - orderId

All timestamp recorded in unix time

## Completed feature

1. Common

   - Login to different role
   - Register for different role (will be removed later)

2. Counter

   - Counter Dashboard
   - Order Tab
   - Bill Tab
   - History Tab

3. Customer

4. Kitchen
