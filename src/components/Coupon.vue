<template>
  <div>

    <loading :active.sync="isLoading"></loading>

    <div class="text-right mt-4">
      <button class="btn btn-primary" @click="openModal('new')" data-target="#couponModal">建立新產品</button>
      <!-- data-toggle="modal" data-target="#couponModal" -->
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th width="">名稱</th>
          <th>折扣百分比</th>
          <th width="">到期日</th>
          <th width="">是否啟用</th>
          <th width="">編輯</th>

        </tr>
      </thead>
      <tbody>
        <tr v-for="(item) in coupons" :key="item.id">
          <td>{{ item.title }}</td>
          <td>{{ item.percent }}</td>
          <td >
            {{ item.due_date }}
          </td>
          <td>
            <span v-if="item.is_enabled" class="text-success">啟用</span>
            <span v-else  class="text-danger">未啟用</span>
          </td>
          <td>
            <button class="btn btn-outline-primary btn-sm" @click="openModal('edit', item)">編輯</button>
            <button class="btn btn-outline-primary btn-sm" @click="openModal('dele', item)" data-target="#delcouponModal">刪除</button>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- table end -->
    <!-- pagination start -->
    <!-- <Pagination :pagination="pagination" v-on:getPageProducts="getProducts"></Pagination> -->
    <!-- pagination end -->

    <!-- Modal start -->

    <div class="modal fade" id="couponModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document"> <!-- modal-lg -->
        <div class="modal-content border-0">
          <div class="modal-header bg-white text-black">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>Modal</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">

              <div class="col-md-12">
                <div class="form-group">
                  <label for="title">標題</label>
                  <input type="text" class="form-control" id="title" v-model="tempCoupon.title" placeholder="請輸入標題">
                  <!-- 增加 v-model="tempCoupon.title"  -->
                </div>

                <div class="form-row">
                    <!-- <div class="form-group col-md-12">
                        <label for="category">優惠碼</label>
                        <input type="text" class="form-control" id="category" v-model="tempCoupon.category" placeholder="請輸入分類">
                
                    </div> -->
                    <div class="form-group col-md-12">
                        <label for="due_date">到期日</label>
                        <input type="unit" class="form-control" id="due_date" v-model="tempCoupon.due_date" placeholder="請輸入到期日">
                        <!-- 增加 v-model="tempCoupon.due_date"  -->
                    </div>
                    <div class="form-group col-md-12">
                        <label for="percent">折扣百分比</label>
                        <input type="text" class="form-control" id="percent" v-model="tempCoupon.percent" placeholder="請輸入折扣百分比">
                        <!-- 增加 v-model="tempCoupon.percent"  -->
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" v-model="tempCoupon.is_enabled" :true-value="1" :false-value="0" id="is_enabled">
                        <!-- 增加 v-model="tempCoupon.is_enabled" true , false-value  -->
                        <label class="form-check-label" for="is_enabled">
                            是否啟用
                        </label>
                  </div>
                </div>

                <!-- <div class="form-row">

                </div>
                <div class="form-group">

                </div> -->
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary" @click="updateCoupon">確認</button>
          </div>
        </div>
      </div>
    </div>
    <div class="modal fade" id="delcouponModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>刪除產品</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            是否刪除
            <strong class="text-danger">{{ tempCoupon.title }}</strong> 商品(刪除後將無法恢復)。
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-danger" @click="deleteCoupon">確認刪除</button>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal end -->
  </div>
  <!-- div end -->
</template>

<script>
import $ from 'jquery';
import Pagination from './pages/Pagination';
export default {
  data() {
    return {
      coupons: [],
      tempCoupon: {},
      isNew: '',
      isLoading: false,
      status: {
        fileUploading: false
      },
      pagination: {},
    }
  },
  methods: {
    getCoupons(page = 1) {
      const api = `${process.env.APIPATH}/api/${
        process.env.CUSTOMERPATH
      }/admin/coupons?page=${page}`;
      const vm = this
      console.log(process.env.APIPATH, process.env.CUSTOMERPATH)
      vm.isLoading = true
      this.$http.get(api).then(response => {
        vm.isLoading = false
        vm.coupons = response.data.coupons
        vm.pagination = response.data.pagination
        console.log('response.data.pagination:', response.data.pagination)
      })
    },
    openModal(isNew, item) {
      if (isNew === 'new') {
        console.log('new')
        this.tempCoupon = Object.assign({}, item)
        this.isNew = 'new'
        $('#couponModal').modal('show')
      } else if (isNew === 'edit') {
        this.tempCoupon = Object.assign({}, item)
        this.isNew = 'edit'
        $('#couponModal').modal('show')
      } else if (isNew === 'dele') {
        $('#delcouponModal').modal('show')
        console.log('dele')
        this.tempCoupon = Object.assign({}, item)
        this.isNew = 'dele'
      }
    },

    updateCoupon() {
      // 原本 /coupons 改成 /admin/coupons  , const 改let
      let api = `${process.env.APIPATH}/api/${
        process.env.CUSTOMERPATH
      }/admin/coupon`
      let httpMethod = 'post'
      const vm = this
      if (vm.isNew === 'edit') {
        api = `${process.env.APIPATH}/api/${
          process.env.CUSTOMERPATH
        }/admin/coupon/${vm.tempCoupon.id}`
        httpMethod = 'put' // 修改的api 使用的是put
      }
      console.log(process.env.APIPATH, process.env.CUSTOMERPATH)
      this.$http[httpMethod](api, { data: vm.tempCoupon }).then(response => {
        // $http.get(api) 改成$http.post(api, {data : vm.tempCoupon}) 由於送出物件的參數 由 { "data": { "title": "標題"}} 所以 vm.tempCoupon要在加{}
        console.log('response.data:', response.data)
        // vm.coupons = response.data.coupons
        if (response.data.success) {
          $('#couponModal').modal('hide')
          vm.getCoupons()
        } else {
          $('#couponModal').modal('hide')
          vm.getCoupons()
          console.log('新增失敗')
        }
      })
    },
    deleteCoupon() {
      const vm = this
      let api = `${process.env.APIPATH}/api/${
        process.env.CUSTOMERPATH
      }/admin/coupon/${vm.tempCoupon.id}`
      this.$http.delete(api).then(response => {
        console.log(response.data)
        if (response.data.success) {
          $('#delcouponModal').modal('hide')
          vm.getCoupons()
          console.log('成功')
        } else {
          console.log('資料刪除失敗')
        }
      })
    },
    uploadFile() {
      console.log('this:', this)
      const uploadedFile = this.$refs.files.files[0]
      const vm = this
      const formData = new FormData()
      formData.append('file-to-upload', uploadedFile)
      const url = `${process.env.APIPATH}/api/${
        process.env.CUSTOMERPATH
      }/admin/upload`
      vm.status.fileUploading = true
      this.$http
        .post(url, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then(response => {
          console.log(response.data)
          vm.status.fileUploading = false
          if (response.data.success) {
            // vm.tempCoupon.imageUrl = response.data.imageUrl;
            // vm.console.log(tempCoupon);
            vm.$set(vm.tempCoupon, 'imageUrl', response.data.imageUrl)
          } else {
            this.$bus.$emit('messsage:push', response.data.message, 'danger')
          }
        })
    }
  },
  created() {
    this.getCoupons()
    // this.$bus.$emit('messsage:push', 'hellohelloehllo', 'success');
  },
  components: {
    Pagination,
  },
}
</script>