import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AllProductsTable from "../components/dashboard/AllProductsTable.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/product/:path",
    name: "SingleProductPage",
    component: () =>
      import(
        /* webpackChunkName: "SingleProductPage"*/ "@/views/SingleProductPage.vue"
      ),
  },
  {
    path: "/pages/:path",
    name: "DetailPage",
    component: () =>
      import(/* webpackChunkName: "ShippingPage"*/ "@/views/DetailPage"),
  },
  {
    path: "/products/:id?",
    name: "ProductsPage",
    component: () =>
      import(/* webpackChunkName: "ProductsPage"*/ "@/views/ProductsPage"),
  },
  {
    path: "/admin/dashboard",
    name: "Dashboard",
    component: () =>
      import(/* webpackChunkName: "DashboardSidebar"*/ "@/views/Dashboard"),
    children: [
      {
        path: "orders",
        name: "AllOrdersTable",
        component: () =>
          import(
            /* webpackChunkName: "AllOrdersTable"*/ "@/components/dashboard/AllOrdersTable"
          ),
      },
      {
        path: "products",
        name: "AllProductsTable",
        component: () =>
          import(
            /* webpackChunkName: "AllProductsTable"*/ "@/components/dashboard/AllProductsTable"
          ),
      },
      {
        path: "products/create",
        name: "CreateProductPage",
        component: () =>
          import(
            /* webpackChunkName: "DashboardSidebar"*/ "@/components/dashboard/CreateProductPage"
          ),
      },
      {
        path: "categories",
        name: "AllCategoriesTable",
        component: () =>
          import(
            /* webpackChunkName: "DashboardSidebar"*/ "@/components/dashboard/AllCategoriesTable"
          ),
      },
      {
        path: "categories/create",
        name: "CreateCategoryPage",
        component: () =>
          import(
            /* webpackChunkName: "DashboardSidebar"*/ "@/components/dashboard/CreateCategoryPage"
          ),
      },
      {
        path: "categories/edit/:id",
        name: "UpdateCategoryPage",
        component: () =>
          import(
            /* webpackChunkName: "DashboardSidebar"*/ "@/components/dashboard/UpdateCategoryPage"
          ),
      },
      {
        path: "categories/edit/:id",
        name: "UpdateCategoryPage",
        component: () =>
          import(
            /* webpackChunkName: "DashboardSidebar"*/ "@/components/dashboard/UpdateCategoryPage"
          ),
      },
      {
        path: "pages",
        name: "AllPagesTable",
        component: () =>
          import(
            /* webpackChunkName: "DashboardSidebar"*/ "@/components/dashboard/pages/AllPagesTable"
          ),
      },
      {
        path: "pages/create",
        name: "CreateNewPage",
        component: () =>
          import(
            /* webpackChunkName: "DashboardSidebar"*/ "@/components/dashboard/pages/CreateNewPage"
          ),
      },
      {
        path: "pages/edit/:id",
        name: "UpdatePage",
        component: () =>
          import(
            /* webpackChunkName: "DashboardSidebar"*/ "@/components/dashboard/pages/UpdatePage"
          ),
      },
      {
        path: "menus",
        name: "MenusPage",
        component: () =>
          import(
            /* webpackChunkName: "DashboardSidebar"*/ "@/components/dashboard/pages/MenusPage"
          ),
      },
    ],
  },
  // {
  //   path: "/shipping",
  //   name: "shippingPage",
  //   component: () =>
  //     import(/* webpackChunkName: "shippingPage"*/ "@/views/shippingPage"),
  // },
  {
    path: "/checkout/thank-you",
    name: "checkoutPage",
    component: () =>
      import(/* webpackChunkName: "checkoutPage"*/ "@/views/checkoutPage"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
