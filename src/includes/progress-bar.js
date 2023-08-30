import NProgress from 'nprogress'

export default (router) => {
  router.beforeEach((to, from, next) => {
    NProgress.start()
    next()
    // to and from are both route objects. must call `next`.
  })

  router.afterEach(NProgress.done)
}
