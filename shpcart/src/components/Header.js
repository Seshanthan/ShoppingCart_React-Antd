import { Badge, Button, Checkbox, Drawer,Form,Input,InputNumber, Menu, message, Table, Typography } from 'antd'
import {HomeFilled,ShoppingCartOutlined} from "@ant-design/icons"
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useState,useEffect } from 'react'
import {getCart} from './api'




function Header(){
  const navigate = useNavigate()
  const onMenuClick=(item)=>{
    navigate(`/${item.key}`)
  };
  return (
    <div className='Header'>
      <Menu className='menu'
      onClick={onMenuClick}
      mode='horizontal'
      items={[
        {       
        label:<HomeFilled/>,
        key:""
        },
        
        {
          label:"Men",
          key:"men",
          children:[
            {
              label:"Mens Casuals",
              key:"mens-shirts",
            },
            {
              label:"Mens Footwear",
              key:"mens-shoes",
            },
            {
              label:"Mens Watches",
              key:"mens-watches",
            },
          ]
        },
        {
          label:"Women",
          key:"women",
          children:[
            {
              label:"Womens Casuals",
              key:"womens-dresses",
            },
            {
              label:"Womens Footwear",
              key:"womens-shoes",
            },
            {
              label:"Womens Watches",
              key:"womens-watches",
            },
          ]
        },
        {
          label:"Fragrances",
          key:"fragrances",
          
        },
      ]}
      />
      <div className='title'>
      <Typography.Title>Sesha's Store</Typography.Title>
      </div>
      <AppCart/>
    </div>
  )
}
function AppCart(){
  const [drawerOpen, setdrawerOpen] = useState(false)
  const [CheckoutDrawerOpen, setCheckoutDrawerOpen] = useState(false)
  const [cartItems, setcartItems] = useState([])
  useEffect(() => {
    getCart().then((res)=>{
    setcartItems(res.products)
    })
  }, [])
  const onConfirmOrder=(values)=>{
    console.log({values})
    setCheckoutDrawerOpen(false)
    setdrawerOpen(false)
    message.success("Your order has been placed")
  }
  return(
    <div>
    <Badge 
    onClick={()=>{
      setdrawerOpen(true)
    }}
    count={cartItems.length} className='carticon'>
      <ShoppingCartOutlined />
    </Badge>
    <Drawer open={drawerOpen} onClose={()=>
    setdrawerOpen(false)
  }
  title="Your Cart"
  contentWrapperStyle={{width: 500}}  
  >

    <Table pagination={false}
    columns={[{
      title:'Title',
      dataIndex:'title'
    },
    {
      title:'Price',
      dataIndex:'price',
      render: (value)=>{
        return <span>₹{value}</span>
      }
    },
    {
      title:'Quantity',
      dataIndex:'quantity',
      render: (value,record)=>{
        return <InputNumber 
          min={0} 
          defaultValue={value} 
          onChange={(value)=>{
          setcartItems(pre=> 
          pre.map(cart=>{
            if(record.id===cart.id){
              cart.total=cart.price*value
          }return cart
        })
      )}}
        ></InputNumber>
      },
    },
    {
      title:'Total',
      dataIndex:'total',
      render: (value)=>{
        return <span>₹{value}</span>
      }
    },
    ]}
    dataSource={cartItems}
    summary ={(data)=>{
      const total = data.reduce((pre,current)=>{
        return pre+current.total
      },0)
      return <span>Total: {total}</span>
    }}
    ></Table>
    <Button onClick={()=>{
      setCheckoutDrawerOpen(true)
    }} type='primary'>Checkout your cart</Button>
    </Drawer>
    <Drawer
      open={CheckoutDrawerOpen}
      onClose={()=>{
        setCheckoutDrawerOpen(false)
      }}
      title="Confirm Order"
      >
        <Form onFinish={onConfirmOrder}>
          <Form.Item rules={[{
            required:true,
            message:'Enter your full name'
          }]}
          label="Full Name"
          name="fullname"
          >
            <Input placeholder='Enter your full name'></Input>
          </Form.Item>
          <Form.Item  rules={[{
            required:true,
            type:'email',
            message:'Please enter a valid email'
          }]}
          label="Email" name="yourname"
          >
            <Input placeholder='Enter your email'></Input>
          </Form.Item>
          <Form.Item
          rules={[{
            required:true,
            message:'Please enter a valid address'
          }]}
          label="Address" name="address"
          >
            <Input placeholder='Enter your address'></Input>

          </Form.Item>
          <Form.Item><Checkbox>Cash on Delivery</Checkbox></Form.Item>
          
          <Button type='primary' htmlType='submit'>
            Confirm Order
          </Button>

        </Form>

    </Drawer></div>
  )
}

export default Header