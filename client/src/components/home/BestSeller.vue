<template>
  <div class="newest-product-container">
    <div class="title-holder">
      <div class="right-alighted-text">
        <h1>المنتجات</h1>
      </div>
      <div class="left-alighted-text">
        <h1>الأكثر مبيعا</h1>
      </div>
    </div>
    <div class="view-all-link">
      <div class="arrow-icon">
        <i class="bi bi-arrow-left-short"></i>
      </div>
      <div class="text">استعراض المزيد</div>
    </div>
    <ProductsHolder :products="bestSellerProducts" />
  </div>
</template>
<script setup>
import ProductsHolder from "@/components/ProductsHolder.vue";
import { reactive, onMounted } from "vue";
import { useProducStore } from "@/stores/product";

const productStore = useProducStore();
const bestSellerProducts = reactive([]);

onMounted(() => {
  let bestSellerCategory = {};
  productStore
    .fetchCategories()
    .then((res) => {
      bestSellerCategory = res.find((value) => value.name === "الأكثر مبيعا");
    })
    .then(() => {
      const filters = {
        categories: bestSellerCategory._id,
      };
      productStore.searchProducts(filters).then((res) => {
        const data = res.map((value) => {
          value.images[0].file = `http://localhost:8000/Images/${value.images[0].file}`;
          return value;
        });
        bestSellerProducts.splice(0, bestSellerProducts.lenght, ...data);
      });
    })
    .catch((error) => console.log(error));
});
</script>
<style>
.newest-product-container {
  display: flex;
  flex-direction: column;
  padding: 50px 60px;
  margin-bottom: 4.5rem;
}
.title-holder h1 {
  font-family: "Rubik", sans-serif;
  font-size: 100px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 3px;
}
.title-holder {
  display: flex;
  flex-direction: column;
  width: 75%;
  margin-inline: auto;
}
.left-alighted-text {
  /* animation: scroll-text-left linear;
  animation-timeline: view(); */
  margin-bottom: 2rem;
}

@keyframes scroll-text-left {
  from {
    transform: translate3d(-15%, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg)
      rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg);
  }
  to {
    transform: translate3d(20%, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg)
      rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg);
  }
}
.right-alighted-text {
  color: #fff;
  margin-left: auto;

  /* animation: scroll-text-right linear;
  animation-timeline: view(); */
  margin-top: -8px;
}
@keyframes scroll-text-right {
  from {
    transform: translate3d(-15%, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg)
      rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg);
  }
  to {
    transform: translate3d(-15%, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg)
      rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg);
  }
}
.view-all-link {
  display: flex;
  cursor: pointer;
  margin-left: 2rem;
}
.view-all-link .text {
  font-family: "Rubik", sans-serif;
  font-size: 18px;
  font-weight: 500;
  margin: auto 0;
}
.view-all-link .text:hover {
  color: #bf8c4e;
}
.view-all-link .arrow-icon {
  transform: rotate(45deg);
  font-size: 2rem;
  color: #bf8c4e;
}

/* Media queries */
@media only screen and (max-width: 768px) {
  .newest-product-container {
    padding: 50px 20px;
  }
  .title-holder h1 {
    font-size: 50px;
  }
  .view-all-link {
    margin-left: 0;
  }
  .view-all-link .text {
    font-size: 1rem;
  }
}
</style>
