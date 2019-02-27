<template>
  <div>

    <loading :active.sync="isLoading"></loading>

    <div class="text-right mt-4">
      <button
        class="btn btn-primary"
        @click="openModal('new')"
        data-target="#productModal"
      >建立新產品</button>
      <!-- data-toggle="modal" data-target="#productModal" -->
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th width="120">分類</th>
          <th>產品名稱</th>
          <th width="120">原價</th>
          <th width="120">售價</th>
          <th width="100">是否啟用</th>
          <th width="80">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item) in products"
          :key="item.id"
        >
          <td>{{ item.category }}</td>
          <td>{{ item.title }}</td>
          <td class="text-right">
            {{ item.origin_price | currency }}
          </td>
          <td class="text-right">
            {{ item.price | currency }}
          </td>
          <td>
            <span
              v-if="item.is_enabled"
              class="text-success"
            >啟用</span>
            <span v-else>未啟用</span>
          </td>
          <td>
            <button
              class="btn btn-outline-primary btn-sm"
              @click="openModal('edit', item)"
            >編輯</button>
            <button
              class="btn btn-outline-primary btn-sm"
              @click="openModal('dele', item)"
              data-target="#delProductModal"
            >刪除</button>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- table end -->
    <!-- pagination start -->
    <Pagination
      :page-data="pagination"
      @pagemove="getProducts"
    ></Pagination>
    <!-- pagination end -->

    <!-- Modal start -->

    <div
      class="modal fade"
      id="productModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div
        class="modal-dialog modal-lg"
        role="document"
      >
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5
              class="modal-title"
              id="exampleModalLabel"
            >
              <span>新增產品</span>
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-4">
                <div class="form-group">
                  <label for="image">輸入圖片網址</label>
                  <input
                    type="text"
                    class="form-control"
                    id="image"
                    v-model="tempProduct.imageUrl"
                    placeholder="請輸入圖片連結"
                  >
                  <!-- 增加 v-model="tempProduct.imageUrl"  -->
                </div>
                <div class="form-group">
                  <label for="customFile">或 上傳圖片
                    <i
                      class="fas fa-spinner fa-spin"
                      v-if="status.fileUploading"
                    ></i>
                  </label>
                  <input
                    type="file"
                    id="customFile"
                    class="form-control"
                    ref="files"
                    @change="uploadFile"
                  >
                </div>
                <img
                  img="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=828346ed697837ce808cae68d3ddc3cf&auto=format&fit=crop&w=1350&q=80"
                  class="img-fluid"
                  :src="tempProduct.imageUrl"
                  alt=""
                >
                <!-- 增加 :src="tempProduct.imageUrl"  -->
              </div>
              <div class="col-sm-8">
                <div class="form-group">
                  <label for="title">標題</label>
                  <input
                    type="text"
                    class="form-control"
                    id="title"
                    v-model="tempProduct.title"
                    placeholder="請輸入標題"
                  >
                  <!-- 增加 v-model="tempProduct.title"  -->
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="category">分類</label>
                    <input
                      type="text"
                      class="form-control"
                      id="category"
                      v-model="tempProduct.category"
                      placeholder="請輸入分類"
                    >
                    <!-- 增加 v-model="tempProduct.category"  -->
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">單位</label>
                    <input
                      type="unit"
                      class="form-control"
                      id="unit"
                      v-model="tempProduct.unit"
                      placeholder="請輸入單位"
                    >
                    <!-- 增加 v-model="tempProduct.unit"  -->
                  </div>
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="origin_price">原價</label>
                    <input
                      type="number"
                      class="form-control"
                      id="origin_price"
                      v-model="tempProduct.origin_price"
                      placeholder="請輸入原價"
                    >
                    <!-- 增加 v-model="tempProduct.origin_price"  -->
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">售價</label>
                    <input
                      type="number"
                      class="form-control"
                      id="price"
                      v-model="tempProduct.price"
                      placeholder="請輸入售價"
                    >
                    <!-- 增加 v-model="tempProduct.price"  -->
                  </div>
                </div>
                <hr>

                <div class="form-group">
                  <label for="description">產品描述</label>
                  <textarea
                    type="text"
                    class="form-control"
                    id="description"
                    v-model="tempProduct.description"
                    placeholder="請輸入產品描述"
                  ></textarea>
                  <!-- 增加 v-model="tempProduct.description"  -->
                </div>
                <div class="form-group">
                  <label for="content">說明內容</label>
                  <textarea
                    type="text"
                    class="form-control"
                    id="content"
                    v-model="tempProduct.content"
                    placeholder="請輸入產品說明內容"
                  ></textarea>
                  <!-- 增加 v-model="tempProduct.content"  -->
                </div>
                <div class="form-group">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      v-model="tempProduct.is_enabled"
                      :true-value="1"
                      :false-value="0"
                      id="is_enabled"
                    >
                    <!-- 增加 v-model="tempProduct.is_enabled" true , false-value  -->
                    <label
                      class="form-check-label"
                      for="is_enabled"
                    >
                      是否啟用
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-outline-secondary"
              data-dismiss="modal"
            >取消</button>
            <button
              type="button"
              class="btn btn-primary"
              @click="updateProduct"
            >確認</button>
          </div>
        </div>
      </div>
    </div>
    <div
      class="modal fade"
      id="delProductModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div
        class="modal-dialog"
        role="document"
      >
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5
              class="modal-title"
              id="exampleModalLabel"
            >
              <span>刪除產品</span>
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            是否刪除
            <strong class="text-danger">{{ tempProduct.title }}</strong> 商品(刪除後將無法恢復)。
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-outline-secondary"
              data-dismiss="modal"
            >取消</button>
            <button
              type="button"
              class="btn btn-danger"
              @click="deleteProudcts"
            >確認刪除</button>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal end -->
  </div>
  <!-- div end -->
</template>

<script>
import $ from "jquery";

export default {
  data() {
    return {
      products: [],
      pagination: {},
      tempProduct: {},
      isNew: "",
      isLoading: false,
      status: {
        fileUploading: false
      }
      // pagination: {
      //   total_pages: 1,
      //   current_page: 1,
      //   has_pre: false,
      //   has_next: false,
      //   category: null
      // }
    };
  },
  methods: {
    getProducts(page = 1) {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMERPATH}/admin/products?page=${page}`;
      const vm = this;
      console.log("api:", api);
      console.log(process.env.APIPATH, process.env.CUSTOMERPATH);
      vm.isLoading = true;
      this.$http.get(api).then(response => {
        console.log("response:", response);
        vm.isLoading = false;
        if (response.data.success) {
          vm.products = response.data.products;
          vm.pagination = response.data.pagination;
        }
      });
    },
    openModal(isNew, item) {
      if (isNew === "new") {
        console.log("new");
        this.tempProduct = Object.assign({}, item);
        this.isNew = "new";
        $("#productModal").modal("show");
      } else if (isNew === "edit") {
        this.tempProduct = Object.assign({}, item);
        this.isNew = "edit";
        $("#productModal").modal("show");
      } else if (isNew === "dele") {
        $("#delProductModal").modal("show");
        console.log("dele");
        this.tempProduct = Object.assign({}, item);
        this.isNew = "dele";
      }
    },

    updateProduct() {
      // 原本 /products 改成 /admin/products  , const 改let
      let api = `${process.env.APIPATH}/api/${
        process.env.CUSTOMERPATH
      }/admin/product`;
      let httpMethod = "post";
      const vm = this;
      if (vm.isNew === "edit") {
        api = `${process.env.APIPATH}/api/${
          process.env.CUSTOMERPATH
        }/admin/product/${vm.tempProduct.id}`;
        httpMethod = "put"; // 修改的api 使用的是put
      }
      console.log(process.env.APIPATH, process.env.CUSTOMERPATH);
      this.$http[httpMethod](api, { data: vm.tempProduct }).then(response => {
        // $http.get(api) 改成$http.post(api, {data : vm.tempProduct}) 由於送出物件的參數 由 { "data": { "title": "標題"}} 所以 vm.tempProduct要在加{}
        console.log("response.data:", response.data);
        // vm.products = response.data.products
        if (response.data.success) {
          $("#productModal").modal("hide");
          vm.getProducts();
        } else {
          $("#productModal").modal("hide");
          vm.getProducts();
          console.log("新增失敗");
        }
      });
    },
    deleteProudcts() {
      const vm = this;
      let api = `${process.env.APIPATH}/api/${
        process.env.CUSTOMERPATH
      }/admin/product/${vm.tempProduct.id}`;
      this.$http.delete(api).then(response => {
        console.log(response.data);
        if (response.data.success) {
          $("#delProductModal").modal("hide");
          vm.getProducts();
          console.log("成功");
        } else {
          console.log("資料刪除失敗");
        }
      });
    },
    uploadFile() {
      console.log("this:", this);
      const uploadedFile = this.$refs.files.files[0];
      const vm = this;
      const formData = new FormData();
      formData.append("file-to-upload", uploadedFile);
      const url = `${process.env.APIPATH}/api/${
        process.env.CUSTOMERPATH
      }/admin/upload`;
      vm.status.fileUploading = true;
      this.$http
        .post(url, formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(response => {
          console.log(response.data);
          vm.status.fileUploading = false;
          if (response.data.success) {
            // vm.tempProduct.imageUrl = response.data.imageUrl;
            // vm.console.log(tempProduct);
            vm.$set(vm.tempProduct, "imageUrl", response.data.imageUrl);
          } else {
            this.$bus.$emit("messsage:push", response.data.message, "danger");
          }
        });
    }
  },
  created() {
    this.getProducts();
    // this.$bus.$emit('messsage:push', 'hellohelloehllo', 'success');
  }
};
</script>