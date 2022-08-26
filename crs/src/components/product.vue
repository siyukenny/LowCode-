<template>
  <div class="product-container">
    <template v-if="property.listStyle == 'listDetail'">
      <div v-for="item in productList" :key="item.jvId" class="productItem"
           :class="property.listStyle"
      >
        <van-image
          width="114"
          height="114"
          :src="item.imgUrl"
        />
        <div class="content">
          <div class="product-info">
            <p class="title">
              {{ item.jvBrand }}
            </p>
            <p class="description">
              {{ item.jvCategoryNames }}
            </p>
          </div>
          <div class="flex-box">
            <div :style="priceStyle" class="price">
              <span>¥</span><span class="big">{{ item.listPrice }}</span>
            </div>
            <div v-if="property.purchase === 1" class="iconfont icon-shangpingoumai" />
          </div>
        </div>
      </div>
    </template>
    <template v-if="property.listStyle == 'oneLineOne'">
      <div v-for="item in productList" :key="item.jvId" class="productItem"
           :class="property.listStyle"
      >
        <van-image
          width="100%"
          height="210"
          :src="item.imgUrl"
        />
        <div class="content">
          <div class="product-info">
            <p class="title">
              {{ item.jvBrand }}
            </p>
            <p class="description">
              {{ item.jvCategoryNames }}
            </p>
          </div>
          <div class="flex-box">
            <div :style="priceStyle" class="price">
              <span>¥</span><span class="big">{{ item.listPrice }}</span>
            </div>
            <div v-if="property.purchase === 1" class="iconfont icon-shangpingoumai" />
          </div>
        </div>
      </div>
    </template>
    <template v-if="property.listStyle == 'oneLineTwo'">
      <div style="padding: 12px;display:flex;justify-content:space-between;flex-wrap:wrap">
        <div v-for="item in productList" :key="item.jvId" class="productItem"
             :class="property.listStyle"
        >
          <van-image
            width="160"
            height="100"
            :src="item.imgUrl"
          />
          <div class="content">
            <div class="product-info">
              <p class="title">
                {{ item.jvBrand }}
              </p>
              <p class="description">
                {{ item.jvCategoryNames }}
              </p>
            </div>
            <div class="flex-box">
              <div :style="priceStyle" class="price">
                <span>¥</span><span class="big">{{ item.listPrice }}</span>
              </div>
              <div v-if="property.purchase === 1" class="iconfont icon-shangpingoumai" />
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
<script>
import { findSkuInfoByIds } from '@/apis/product.js'

const PRODUCTDEFAULT = [{jvBrand: '商品名称', jvCategoryNames: '商品描述', listPrice: 0}]
export default {
  name: 'Product',
  props: {
    property: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data () {
    return {
      productList: PRODUCTDEFAULT,
      priceStyle: {}
    }
  },
  watch: {
    property (value) {
      const skuIdList = value.productList.map(v => {
        return v.id
      })
      if (skuIdList.length) {
        findSkuInfoByIds({
          skuIdList
        }).then(res => {
          console.log(res, 'res')
          this.productList = res.data
        })
        this.priceStyle = {
          color: value.exchangePriceColor
        }
      } else {
        this.productList = PRODUCTDEFAULT
      }
    }
  },
  mounted () {
    if (this.property.productList.length) {

    }
  }
}
</script>
<style scoped>
  .flex-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .product-container p {
    margin: 0
  }
  .product-container .productItem {
    padding: 12px;
    background: #fff;
  }
  .product-container .productItem.oneLineTwo {
    padding: 0;
  }
  .product-container .listDetail{
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .product-container .listDetail .content {
    width: 225px;
    height: 114px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .product-container .listDetail .content .product-info .title {
    margin-bottom: 8px;
  }
  .product-container .oneLineOne .content .product-info .title {
    margin-bottom: 4px;
  }
  .product-container .oneLineTwo {
    margin-bottom: 10px;
  }
  .product-container .listDetail .content .product-info .title,
  .product-container .oneLineOne .content .product-info .title,
  .product-container .oneLineTwo .content .product-info .title{
    font-size: 14px;
    color: #333;
    font-weight: 500;
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .product-container .listDetail .content .product-info .description,
  .product-container .oneLineOne .content .product-info .description,
  .product-container .oneLineTwo .content .product-info .description{
    font-size: 12px;
    font-weight: 400;
    color: #999;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    word-break: break-all;
  }
  .product-container .oneLineOne .content .product-info .description {
    margin-bottom: 4px;
  }
  .product-container .oneLineTwo .content .product-info .description {
    margin-bottom: 4px;
  }
  .product-container .listDetail .content .price,
  .product-container .oneLineOne .content .price,
  .product-container .oneLineTwo .content .price {
    font-size: 12px;
    /* color: #DD1A21; */
  }
  .product-container .listDetail .content .price .big,
  .product-container .oneLineOne .content .price .big,
  .product-container .oneLineTwo .content .price .big{
    font-size: 20px;
  }
  .product-container .oneLineTwo .content{
    width: 160px;
  }
  .icon-shangpingoumai {
    color: red;
    font-size: 18px;
  }
</style>
