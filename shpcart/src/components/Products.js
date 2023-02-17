import { Card, List,Image,Typography, Badge,Rate, Button, message, Select} from "antd";
import { useState,useEffect } from "react";
import { getAllProducts,addToCart,getProductsByCategory } from "./api";
import { useParams } from "react-router-dom";

function Products(){
    const [loading,setloading] = useState(false)
    const param = useParams()
    const [items,setitems] = useState([]);
    const [sortOrder,setsortOrder] = useState('lowhigh')
    useEffect(()=>{
        setloading(true);
        (param?.categoryId ? 
        getProductsByCategory(param.categoryId):
        getAllProducts())
        .then((res)=>{
            setitems(res.products)
            setloading(false)
        })
    },[param])
    const getSortedItems=()=>{
        const sortedItems = [...items]
        sortedItems.sort((a,b)=>{
            if(sortOrder==='lowhigh'){
                return a.price>b.price?1:a.price===b.price?0:-1
            }
            else if(sortOrder==='highlow'){
                return a.price<b.price?1:a.price===b.price?0:-1
            }
        }) 
        return sortedItems
    }
   
    return(
        <div className="Prdcts">
            <div>
                <Typography.Text>Items Sorted by:</Typography.Text>
                <Select
                onChange={(value)=>{
                    setsortOrder(value)
                }}
                defaultValue={'highLow'}
                options={[{
                    label:'Price Low to High',
                    value:'lowhigh'
                },{
                    label:'Price High to Low',
                    value:'highLow'
                }
                ]}>
                

                </Select>
            </div>
            <List 
            loading={loading}
            grid={{column:3}}
            renderItem={(product,index)=>{
                return (
                <Badge.Ribbon className="crdBadge" text={`${product.discountPercentage}% Off`} color="red">
                <Card
                className="card" 
                title={product.title} key={index} 
                cover={
                <Image className="cardImage" src={product.thumbnail}></Image>}
                actions={[
                    <Rate allowHalf disabled value={product.rating}></Rate>,
                    <AddToCartButton item={product} />
                ]}
                >
                    <Card.Meta title={
                        <Typography.Paragraph>
                            Price: ₹ {product.price}{" "}
                            <Typography.Text delete type="danger">
                                {parseFloat(
                                    product.price +
                                    (product.price * product.discountPercentage/100)
                                ).toFixed(2)}
                            </Typography.Text>
                        </Typography.Paragraph>
                    }
                    description={<Typography.Paragraph ellipsis={{rows:2,expandable:true,symbol:'more'}}>{product.description}</Typography.Paragraph>}
                    ></Card.Meta>
                </Card>
                </Badge.Ribbon>)
            }} dataSource={getSortedItems()}>

            </List>
        </div>
    )
}
function AddToCartButton({ item }) {
    const [loading,setloading] = useState(false)
    const addProductToCart = () => {
        setloading(true)
      addToCart(item.id).then((res) => {
        message.success(`${item.title} has been added to cart!`);
        setloading(false)
      })
    }
    return (
      <Button type="link" onClick={() => {
          addProductToCart();
        }} loading={loading}>Add to Cart</Button>
    )
  }

export default Products