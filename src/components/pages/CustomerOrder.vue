<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <!-- <ul v-for="data in products">
        <li>{{ data }}</li>
    </ul> -->
    <div class="row mt-4">
      <div class="col-md-4 mb-4" v-for="item in products" :key="item.id">
        <div class="card border-0 shadow-sm">
          <div style="height: 150px; background-size: cover; background-position: center"
          :style="{ backgroundImage: `url(${item.imageUrl})`}">
          </div>
          <div class="card-body">
            <span class="badge badge-secondary float-right ml-2">{{ item.category }}</span>
            <h5 class="card-title">
              <a href="#" class="text-dark"
              >{{ item.title }}</a>
            </h5>
            <p class="card-text">{{ item.content }}</p>
            <div class="d-flex justify-content-between align-items-baseline">
              <!-- <div class="h5">2,800 元</div> -->
              <del class="h6">原價 {{ item.origin_price }} 元</del>
              <div class="h5">現在只要 {{ item.price }} 元</div>
            </div>
          </div>
          <div class="card-footer d-flex">
            <button type="button" class="btn btn-outline-secondary btn-sm"
                @click="getProduct(item.id)">
              <i class="fas fa-spinner fa-spin" v-if="status.loadingItem === item.id"></i>
              查看更多
            </button>
            <button type="button" class="btn btn-outline-danger btn-sm ml-auto">
              <i class="fas fa-spinner fa-spin" v-if="status.loadingItem === item.id"></i>
              加到購物車
            </button>
          </div>
        </div>
      </div>
    </div> <!-- row  end-->
    <!-- modal -->
    <div class="modal fade" id="productModal"tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">{{product.title}}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <img :src="product.imageUrl" class="img-fluid" alt>
            <blockquote class="blockquote mt-3">
              <p class="mb-0">{{product.content}}</p>
              <footer class="blockquote-footer text-right">{{product.description}}</footer>
            </blockquote>
            <div class="d-flex justify-content-between align-items-baseline">
              <div class="h5" v-if="!product.price">{{product.origin_price}} 元</div>
              <del class="h6" v-if="product.price">原價{{product.origin_price}}元</del>
              <div class="h5" v-if="product.price">現在只要{{product.price}}元</div>
            </div>
            <select name class="form-control mt-3" v-model="product.num">
              <option :value="num" v-for="num in 10" :key="num">選購{{num}}{{product.unit}}</option>
            </select>
          </div>
          <div class="modal-footer">
            <div class="text-muted text-nowrap mr-3">
              小計
              <strong>{{product.num*product.price}}</strong>
            </div>
            <button
              type="button"
              class="btn btn-primary"
              @click="addtoCart(product.id,product.num)"
            >
              <i class="fas"></i>
              加到購物車
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- modal end  -->

  </div>
</template>
<script>
import $ from 'jquery';

export default {
  data() {
    return {
      products: [],
      isLoading: false,
      product: {},
      status: {
          loadingItem: '',
      }
    };
  },
  methods: {
    getProducts(page = 1) { // 整體資料有prodcuts 有s
      const vm = this;
      const api = `${process.env.APIPATH}/api/${
        process.env.CUSTOMERPATH
      }/products?page=${page}`;
    //   console.log('api:', api)
      vm.isLoading = true;
      this.$http.get(api).then(response => {
        vm.products = response.data.products;
        // console.log("response:", response);
        vm.isLoading = false;
      });
    },
    getProduct(id) { // 單筆資料有prodcut 沒有s
      const vm = this;
      const api = `${process.env.APIPATH}/api/${
        process.env.CUSTOMERPATH
      }/product/${id}`;
      console.log('api:', api);
      vm.status.loadingItem = id;
      this.$http.get(api).then(response => {
          vm.product = response.data.product;
          $('#productModal').modal('show');
        // vm.products = response.data.product;
        console.log("response:", response);
        vm.status.loadingItem = '';
      });
    }
  },
  created() {
    this.getProducts();
  }
};
</script>