<template>
  <div class="DashBoard-Container LayoutSub-Frame">
    <p class="title force">指标增长数据</p>
    <div class="quantity-statistics">
      <div class="quantity-item">
        <div class="quantity-detail">
          <div class="quantity-detail-box">
            <div class="quantity-title">总访问量</div>
            <div class="quantity">{{ visit.tweened.toFixed(0) }}</div>
          </div>
        </div>
        <div class="quantity-icon"><img src="@assets/static/icon/about/icon1.png" alt="" /></div>
      </div>
      <div class="quantity-item">
        <div class="quantity-detail">
          <div class="quantity-detail-box">
            <div class="quantity-title">总用户数</div>
            <div class="quantity">{{ users.tweened.toFixed(0) }}</div>
          </div>
        </div>
        <div class="quantity-icon"><img src="@assets/static/icon/about/icon2.png" alt="" /></div>
      </div>
      <div class="quantity-item">
        <div class="quantity-detail">
          <div class="quantity-detail-box">
            <div class="quantity-title">新增访问量 (月)</div>
            <div class="quantity">1,862</div>
          </div>
        </div>
        <div class="quantity-icon"><img src="@assets/static/icon/about/icon3.png" alt="" /></div>
      </div>
      <div class="quantity-item">
        <div class="quantity-detail">
          <div class="quantity-detail-box">
            <div class="quantity-title">新增用户数</div>
            <div class="quantity">1,323</div>
          </div>
        </div>
        <div class="quantity-icon"><img src="@assets/static/icon/about/icon4.png" alt="" /></div>
      </div>
    </div>
    <br />
    <br />
    <Chart />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Chart from '~/addons/chart/view/chart.vue'

import { systemModel } from '@plugins/model/base/SystemModel'
import { genGsapNumber } from '@plugins/Common.ts'

const visit = genGsapNumber()
const users = genGsapNumber()

async function initial() {
  const res = await systemModel.getDashBoardData()

  visit.number = res.visit
  users.number = res.users
}

onMounted(initial)
</script>

<style scoped lang="scss">

.DashBoard-Container {
  .quantity-statistics {
    position: relative;
    display: flex;
    justify-content: space-between;

    margin-top: 20px;
    //.quantity-right {
    //  position: relative;
    //  display: none;
    //  span {
    //    position: absolute;
    //
    //    top: 10%;
    //    left: 5%;
    //
    //    color: #fff;
    //    font-weight: 400;
    //    line-height: 30px;
    //    letter-spacing: 1px;
    //    font-size: 19px;
    //  }
    //  .quantity-right-bg {
    //    z-index: 0;
    //    position: absolute;
    //
    //    right: -30%;
    //    opacity: .75;
    //  }
    //  .quantity-right-btn {
    //    &:hover {
    //      color: #fff;
    //      background: rgba(200, 200, 200, 0.3);
    //      cursor: pointer;
    //    }
    //    position: absolute;
    //
    //    width: 84px;
    //    height: 32px;
    //
    //    left: 5%;
    //    bottom: 12%;
    //
    //    color: #ccc;
    //    line-height: 32px;
    //    text-align: center;
    //    border-radius: 6px;
    //    border: 2px solid #fff;
    //
    //    transition: .3s cubic-bezier(.25,.8,.25,1);
    //  }
    //  width: 560px;
    //  height: 200px;
    //
    //  background: #4273f6;
    //  border-radius: 22px;
    //  overflow: hidden;
    //}
    .quantity-item {
      position: relative;
      display: flex;
      //margin-right: 10px;
      width: 220px;
      height: 200px;
      background: var(--el-bg-color);
      box-shadow: var(--el-box-shadow-lighter);
      border-radius: 22px;
      .quantity-detail {
        flex: 1;
        .quantity-detail-box {
          position: absolute;

          width: 80%;

          left: 10%;
          bottom: 2%;
          .quantity-title {
            margin-bottom: 2px;
            height: 22px;
            line-height: 20px;
            color: var(--el-text-color-regular);
            font-size: 14px;
            font-weight: 400;
            opacity: .85;
          }
          .quantity {
            height: 48px;
            font-size: 23px;
            font-weight: 600;
            color: var(--el-text-color-secondary);
            line-height: 38px;
            letter-spacing: 1px;
          }
        }
      }
      .quantity-icon {
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;

        left: 10%;
        top: 10%;

        width: 56px;
        height: 56px;

        border-radius: 19px / 22px;
        mask-image: paint(19px);
        background: var(--el-fill-color-lighter);
        img {
          width: 33px;
          height: 33px;
        }
      }
    }
  }
  .information {
    margin-top: 20px;
    display: flex;
    .personal {
      width: 320px;
      height: 100%;
      margin-right: 20px;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 2px 14px 0px rgba(243, 243, 243, 1);
      border-radius: 8px;
      .personal-title {
        margin: 20px 0 10px 20px;
        height: 22px;
        line-height: 22px;
        font-weight: 500;
        color: #596c8e;
        font-size: 16px;
      }
      .personal-avatar {
        width: 140px;
        height: 140px;
        margin: 0 auto 40px;
        border-radius: 75px;
        box-shadow: 0 0 30px 0 #cfd5e3;
      }
      .personal-influence {
        display: flex;
        justify-content: space-between;
        padding: 0 30px 40px;
        .personal-influence-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          .personal-influence-num {
            font-size: 28px;
            line-height: 34px;
            &.color1 {
              color: #00c292;
            }
            &.color2 {
              color: #fec108;
            }
            &.color3 {
              color: #03a9f3;
            }
          }
          .personal-influece-label {
            font-size: 12px;
            font-weight: 400;
            color: #8c98ae;
            line-height: 17px;
          }
        }
      }
      .personal-tabs {
        margin-bottom: 20px;
      }
      .personal-tabs :v-deep(.is-top) {
        width: 320px;
        display: flex;
        justify-content: space-around;
      }
      .personal-tabs :v-deep(.el-tabs__content) {
        text-indent: 20px;
      }
    }
    .article {
      flex: 1;
      height: 100%;
      padding: 20px;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 2px 14px 0px rgba(243, 243, 243, 1);
      border-radius: 8px;
      .article-title {
        height: 22px;
        line-height: 22px;
        font-weight: 500;
        color: #596c8e;
        font-size: 16px;
        margin-bottom: 20px;
      }
      .article-list {
        cursor: pointer;
        .article-item {
          display: flex;
          flex-direction: row;
          justify-content: flex-start;

          .article-thumb {
            width: 120px;
            height: 120px;
            border-radius: 8px;
            margin-right: 30px;
          }
          .article-detail {
            flex: 1;
            border-bottom: 1px #ecedef solid;
            margin-bottom: 20px;
            &.article-last {
              border-bottom: none;
              margin-bottom: 0;
            }
            .article-detail-title {
              height: 22px;
              font-size: 16px;
              font-weight: 400;
              color: rgba(69, 82, 107, 1);
              line-height: 22px;
            }
            .article-detail-content {
              margin-top: 10px;
              font-size: 14px;
              font-weight: 400;
              color: rgba(140, 152, 174, 1);
              line-height: 22px;
            }
          }
          .article-tool {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            margin: 10px 0 20px 0;
            font-size: 12px;
            line-height: 17px;
            font-weight: 400;
            color: #808da3;
            .article-about {
              .iconfont {
                line-height: 17px;
                margin-right: 6px;
                font-size: 12px;
              }
            }
          }
        }
      }
    }
  }

  width: unset;

}

//@media screen and (max-width: 1200px) {
//  .container .lin-info .lin-info-right {
//    display: none;
//  }
//  .container .lin-info .lin-info-left {
//    width: 100%;
//  }
//  .container .quantity-statistics .quantity-item {
//    width: 32%;
//    &:last-child {
//      display: none;
//    }
//  }
//  .container .information .personal {
//    display: none;
//  }
//}
//
//@media screen and (max-width: 1200px) {
//  .container .lin-info .lin-info-left {
//    width: 100%;
//  }
//}
</style>
