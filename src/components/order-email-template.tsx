import * as React from 'react';

interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface OrderDetails {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  items: OrderItem[];
  totalAmount: number;
}

export const OrderEmailTemplate: React.FC<Readonly<OrderDetails>> = ({
  fullName,
  email,
  phone,
  address,
  city,
  postalCode,
  items,
  totalAmount,
}) => (
  <div>
    <h1>New Order Placed</h1>
    <h2>Customer Details:</h2>
    <p>Name: {fullName}</p>
    <p>Email: {email}</p>
    <p>Phone: {phone}</p>
    <p>Address: {address}</p>
    <p>City: {city}</p>
    <p>Postal Code: {postalCode}</p>
    
    <h2>Order Summary:</h2>
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Item</th>
          <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Quantity</th>
          <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Price</th>
          <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Total</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr key={item.id}>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{item.name}</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{item.quantity}</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>Rs {item.price.toFixed(2)}</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>Rs {(item.price * item.quantity).toFixed(2)}</td>
          </tr>
        ))}
      </tbody>
    </table>
    
    <h3>Total Amount: ₹{totalAmount.toFixed(2)}</h3>
    <p>Payment Method: Cash on Delivery</p>
  </div>
);