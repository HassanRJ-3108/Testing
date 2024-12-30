'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Package } from 'lucide-react'
import { useCart } from '../contexts/CartContext'
import products from '@/app/products/products'
import axios from 'axios'

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"

const formSchema = z.object({
  fullName: z.string().min(2, {
    message: "Full name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  address: z.string().min(5, {
    message: "Address must be at least 5 characters.",
  }),
  city: z.string().min(2, {
    message: "City must be at least 2 characters.",
  }),
  postalCode: z.string().min(5, {
    message: "Postal code must be at least 5 characters.",
  }),
  phone: z.string().min(10, {
    message: "Phone number must be at least 10 digits.",
  }),
  confirmCashOnDelivery: z.boolean().refine(value => value === true, {
    message: "You must confirm Cash on Delivery to place the order.",
  }),
})

export default function CheckoutPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [orderId, setOrderId] = useState<string | null>(null)
  const [orderTotal, setOrderTotal] = useState(0)
  const { cart, checkout } = useCart()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      address: "",
      city: "",
      postalCode: "",
      phone: "",
      confirmCashOnDelivery: false,
    },
  })

  const cartItemsWithDetails = cart
    .map(cartItem => {
      const productDetails = Object.values(products)
        .flatMap(category => category.products)
        .find(product => product.id === cartItem.id)

      if (productDetails) {
        return {
          ...productDetails,
          quantity: cartItem.quantity,
          id: productDetails.id
        }
      }
      return undefined
    })
    .filter((item): item is (typeof products[keyof typeof products]['products'][number] & { quantity: number }) => item !== undefined)

  const total = cartItemsWithDetails.reduce((sum, item) => sum + item.price * item.quantity, 0)

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    try {
      const orderDetails = {
        ...values,
        items: cartItemsWithDetails,
        totalAmount: total,
        name: values.fullName,
        paymentMethod: 'Cash on Delivery',
      }

      // Send order details to the server
      const response = await axios.post('/api/send-order', orderDetails)

      if (response.status === 200) {
        const result = await checkout(orderDetails)
        if (result.success) {
          setOrderId(result.orderId || null)
          setOrderTotal(total)
          setOrderPlaced(true)
          form.reset() // Reset the form
        } else {
          throw new Error('Checkout failed')
        }
      } else {
        throw new Error('Failed to send order details')
      }
    } catch (error) {
      console.error('Checkout failed:', error)
      // You might want to show an error message to the user here
    } finally {
      setIsLoading(false)
    }
  }

  if (orderPlaced) {
    return (
      <div className="container mx-auto p-4">
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
          <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
            <Card className="border border-green-500">
              <CardHeader className="bg-green-500 text-white p-4 rounded-t-lg">
                <CardTitle className="text-xl">Order Confirmation</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4 text-green-600">Thank you for your order!</h2>
                <p className="mb-2">Your order has been placed successfully.</p>
                {orderId && <p className="mb-4">Order ID: {orderId}</p>}
                <p>You will pay Rs {orderTotal.toFixed(2)} on delivery.</p>
                <p className="mt-4">You will receive a confirmation email shortly.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4 mt-10">
      <h1 className="text-2xl font-bold mb-6">Checkout - Cash on Delivery</h1>
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Shipping Information</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="john@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input type="tel" placeholder="1234567890" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input placeholder="123 Main St" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input placeholder="New York" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="postalCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Postal Code</FormLabel>
                      <FormControl>
                        <Input placeholder="10001" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Separator className="my-4" />
                <FormField
                  control={form.control}
                  name="confirmCashOnDelivery"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          I confirm that I will pay Rs {total.toFixed(2)} in cash upon delivery
                        </FormLabel>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isLoading || cartItemsWithDetails.length === 0 || total === 0}
                >
                  {isLoading ? (
                    "Processing..."
                  ) : (
                    <>
                      <Package className="mr-2 h-4 w-4" /> Place Order (Cash on Delivery)
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent>
            {cartItemsWithDetails.length === 0 ? (
              <p>Your cart is empty. Please add items to your cart before checking out.</p>
            ) : (
              <>
                {cartItemsWithDetails.map((item) => (
                  <div key={item.id} className="flex justify-between py-2">
                    <span>{item.name} x {item.quantity}</span>
                    <span>Rs {(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                <Separator className="my-4" />
                <div className="flex justify-between font-bold">
                  <span>Total (to be paid on delivery)</span>
                  <span>Rs {total.toFixed(2)}</span>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}