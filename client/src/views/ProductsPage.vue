<template>
  <div class="products-section-container">
    <div class="products-header">
      <div class="products-filters">
        <div
          class="dropdown"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          @click="openDropdown = !openDropdown"
        >
          <h3>الترتيب حسب :</h3>
          <div class="dropdown-select">
            <i class="bi bi-chevron-down" v-if="!openDropdown"></i>
            <i class="bi bi-chevron-up" v-if="openDropdown"></i>
            {{ selectedItem }}
          </div>

          <ul class="dropdown-menu">
            <li
              v-for="(item, index) in dropdownList"
              :key="index"
              @click="editFilter(index)"
            >
              <a class="dropdown-item" href="#">
                <span>{{ item }}</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <h2 class="title">{{ productStore.selectedCategory.name }}</h2>
    </div>
    <div class="products-section-content">
      <ProductsHolder :products="productList" :displayOption="displayOption" />
    </div>
  </div>
  <Footer />
</template>
<script setup>
import ProductsHolder from "@/components/ProductsHolder.vue";
import Footer from "@/components/Footer.vue";
import { reactive, onMounted, ref } from "vue";
import { useProducStore } from "@/stores/product";

const productStore = useProducStore();

const productList = reactive([]);
const dropdownList = reactive([
  "مقترح",
  "وصل حديثا",
  "السعر (تنازلي)",
  "السعر (تصاعدي)",
]);
const selectedItem = ref("مقترح");
const openDropdown = ref(false);
const displayOption = ref(4);

const editFilter = (index) => {
  let sortBy = null;
  let order = null;
  selectedItem.value = dropdownList[index];
  switch (index) {
    case 0:
      sortBy = "";
      order = "";
      break;
    case 1:
      sortBy = "createdAt";
      order = "desc";
      break;
    case 2:
      sortBy = "price";
      order = "desc";
      break;
    case 3:
      sortBy = "price";
      order = "asc";
      break;
  }
  productStore.fetchAllProducts(sortBy, order).then((res) => {
    const data = res.map((value) => {
      value.images[0].file = `http://localhost:8000/Images/${value.images[0].file}`;
      return value;
    });
    productList.splice(0, productList.length, ...data);
  });
};

onMounted(() => {
  const filters = {
    categories: productStore.selectedCategory._id,
  };
  productStore.searchProducts(filters).then((res) => {
    const data = res.map((value) => {
      value.images[0].file = `http://localhost:8000/Images/${value.images[0].file}`;
      return value;
    });
    productList.splice(0, productList.length, ...data);
  });
});
</script>
<style>
.products-section-container {
  overflow: hidden;
  padding: 5rem 6rem 6rem;
}
.products-header {
  display: flex;
  padding: 1.5rem;
}
.products-header .title {
  font-family: "Rubik", sans-serif;
  font-size: 2rem;
  font-weight: 600;
  margin-left: auto;
}
.products-filters {
  display: flex;
  flex-direction: row-reverse;
  gap: 2.5rem;
  margin-right: auto;
  margin-top: auto;
}
.products-filters h3 {
  direction: rtl;
  font-size: 20px;
}
.products-filters .dropdown {
  display: flex;
  flex-direction: row-reverse;
  gap: 1rem;
  cursor: pointer;
}
.products-filters .dropdown ul.dropdown-menu {
  border-radius: 4px;
}
.products-filters .dropdown .dropdown-menu li .dropdown-item {
  display: flex;
}
.products-filters .dropdown .dropdown-menu li .dropdown-item:hover {
  font-weight: 500;
}
.products-filters .dropdown .dropdown-menu .dropdown-item span {
  margin-left: auto;
  font-size: 14px;
}
.products-filters .dropdown-select {
  display: flex;
  gap: 10px;
}
.products-filters .dropdown-select i {
  font-size: 12px;
  margin-block: auto;
}
.products-filters .dropdown-select i::before {
  font-weight: 600;
}
.products-section-content {
  display: flex;
}
</style>
