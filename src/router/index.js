import { createRouter, createWebHistory } from "vue-router";
import ProfileSubmissions from "../views/ProfileSubmissions.vue";
import Upload from "../views/Upload.vue";

const routes = [
  {
    path: "/profileSubmissions",
    name: "ProfileSubmissions",
    component: ProfileSubmissions
  },
  {
    path: "/upload",
    name: "Upload",
    component: Upload
  }
];

const router = createRouter({
                              history: createWebHistory(process.env.BASE_URL),
                              routes
                            });

export default router;
