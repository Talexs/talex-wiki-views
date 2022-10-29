<template>
  <div class="ProPlan-Container LayoutSub-Frame">
    <div class="ProPlan-Card">
      <div class="ProPlan-Info">
        <h1>荣誉维基会员</h1>
        <div class="ProPlan-Info-Profile">
          <span>您还不是 荣誉维基会员</span><br />
          <div class="ProPlan-GoldProgressbar"></div>
        </div>
      </div>
      <div class="ProPlan-Gold">
        <div class="ProPlan-GoldBackRound">
        </div>
        <div class="ProPlan-GoldDiamond">
            <div class="gold-diamond-inner">
              T
            </div>
          </div>
        <div class="ProPlan-GoldBanner">
          <span class="gold-main">PREMIUM</span>
          <span class="left"></span>
          <span class="right"></span>
        </div>
      </div>
    </div>
    <div class="ProPlan-Info-Desc">
      <span class="plan-info-desc-line"><span style="color: #794c1b">创作</span>，不止一个人</span>
      <span class="plan-info-desc-line"><span style="color: #794c1b">协同</span>，编辑更高效</span>
      <span class="plan-info-desc-line"><span style="color: #794c1b">团队</span>，深刻的打磨</span>
    </div>
    <div class="ProPlan-Rights">
      <div class="ProPlan-Rights-Title">
        <div class="proplan-rights-title-left" />
        <div class="proplan-rights-title-span">
          会员权益
        </div>
        <div class="proplan-rights-title-right" />
      </div>
      <div class="ProPlan-Rights-Rights">
        <el-button text :icon="item.icon" :class="{ year: item.year }" class="ProPlan-Rights-right" v-for="item in rights">
          <p>{{  item.label }}</p>
          <span>{{  item.span }}</span>
        </el-button>
      </div>
    </div>
    <div class="ProPlan-Price">
      <el-carousel :interval="4000" type="card" height="200px">
        <el-carousel-item class="ProPlan-PriceTag">
          <h2>PREMIUM</h2>

          <div class="pricetag-price">
<!--            <div class="pricetag-original">2.4元/天</div>-->
            <span class="pricetag-now">
              <span class="pricetag-bigger">72</span>
              元/月
            </span>
          </div>

          <div v-wave class="pricetag-button transition-cubic">立即购买</div>
        </el-carousel-item>
        <el-carousel-item class="ProPlan-PriceTag yearly">
          <h2>PREMIUM 年会</h2>

          <div class="pricetag-price">
            <div class="pricetag-original">原价2.4元/天</div>
            <span class="pricetag-now">
              <span class="pricetag-bigger">1.5</span>
              元/天
            </span>
          </div>

          <div v-wave class="pricetag-button transition-cubic">立即购买</div>
        </el-carousel-item>
        <el-carousel-item class="ProPlan-PriceTag">
          <h2>PREMIUM</h2>

          <div class="pricetag-price">
<!--            <div class="pricetag-original">原价2.4元/天</div>-->
            <span class="pricetag-now">
              <span class="pricetag-bigger">216</span>
              元/季度
            </span>
          </div>

          <div v-wave class="pricetag-button transition-cubic">立即购买</div>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Present, Money, Medal, Cloudy, Refrigerator, Cpu, PictureRounded, Edit } from '@element-plus/icons-vue'

const rights = ref([
  { icon: Edit,
    label: "团队协作",
    span: "解锁同步编辑"
  },
  { icon: PictureRounded,
    label: "主题+",
    span: "皮肤，千变万化"
  },
  { icon: Medal,
    label: "身份标签",
    span: "赏析动感美学"
  },
  { icon: Cloudy,
    label: "云主机",
    span: "数据云端穿梭"
  },
  { icon: Cpu,
    label: "计算分配",
    span: "团队协作更高效",
    year: true
  },
  { icon: Money,
    label: "充值优惠",
    span: "随机优惠券",
    year: true
  },
  { icon: Refrigerator,
    label: "冷备份",
    span: "双倍保障，更贴心",
    year: true
  },
  {
    icon: Present,
    label: "模板市场",
    span: "八折优惠起售",
    year: true
  },
])

</script>

<script>
export default {
  name: "ProPlan"
}
</script>

<style lang="scss" scoped>
.ProPlan-Price {
  :deep(.ProPlan-PriceTag) {
    &.yearly::before {
      content: "限时特惠";
      position: absolute;

      top: 10px;
      left: -50px;

      width: 180px;
      line-height: 32px;
      height: 32px;

      text-align: center;
      font-size: 16px;
      transform: translateX(-10px) rotate(-40deg);
      background-image: linear-gradient(115deg, #cfaa83 0%, #daa876 0%, #e1c0a3 21%, #c09c73 32%, #754716 100%);
    }
    .pricetag-price {
      .pricetag-now {
        .pricetag-bigger {
          font-weight: 600;
          font-size: 35px;
        }
        font-size: 22px;
      }
      .pricetag-original {
        position: relative;
        display: inline-block;
        &:before {
          content: "";
          position: absolute;

          left: -2px;
          top: 50%;

          height: 2px;
          width: calc(100% + 4px);

          //background: linear-gradient(to right, #deb58f 1%, #e0bfa2, #deb58f 99%);
          border-radius: 10px;
          background: #e0bfa2;
          transform: translateY(-50%) translateY(1px);
        }
        padding: 0 6px;
        margin-right: 10px;
        text-align: center;
        transform: skewX(-10deg);
      }
      position: relative;

      top: 20px;
    }
    .pricetag-button {
      &:hover {
        opacity: .85;
        box-shadow: 0 0 4px 4px #daa876;
        transform: scale(1.05);
      }
      &:active {
        transform: scale(.85);
      }
      position: relative;
      display: inline-block;

      top: 50px;

      line-height: 36px;
      height: 36px;
      width: 60%;

      cursor: pointer;
      border-radius: 20px;
      box-shadow: 0 0 2px 2px #daa876;
      background-image: linear-gradient(115deg, #cfaa83 0%, #daa876 0%, #e1c0a3 21%, #c09c73 32%, #754716 100%);
    }

    color: #e0bfa2;
    text-align: center;
    border-radius: 8px;
    background-color: var(--el-fill-color-lighter);
  }
  margin-bottom: 20px;
  height: 200px;

  user-select: none;
}

.ProPlan-Rights-Title {
  .proplan-rights-title-left {
    &:before {
      content: "";
      position: absolute;

      left: -600%;
      top: 50%;

      width: 120px;
      height: 3px;

      border-radius: 5px;
      background: linear-gradient(to left, #cfaa83, transparent);
      transform: translateY(-50%);
    }
    position: absolute;

    top: 4px;
    left: 25%;

    width: 24px;
    height: 24px;

    border-radius: 50%;
    background-color: #cfaa83;
  }
  .proplan-rights-title-right {
    &:before {
      content: "";
      position: absolute;

      left: 200%;
      top: 50%;

      width: 120px;
      height: 3px;

      border-radius: 5px;
      background: linear-gradient(to right, #cfaa83, transparent);
      transform: translateY(-50%);
    }
    position: absolute;

    top: 4px;
    right: 25%;

    width: 24px;
    height: 24px;

    border-radius: 50%;
    background-color: #cfaa83;
  }
  z-index: 1;
  position: absolute;

  left: 20%;
  top: -10px;

  width: 60%;
  height: 50px;

  color: #cfaa83;
  font-weight: 600;
  text-align: center;
  letter-spacing: 5px;
  font-size: 30px;
  user-select: none;
}

:deep(.ProPlan-Rights-right) {
  &.year::after {
    content: "年会专享";
    position: absolute;

    left: 0;
    bottom: -10px;

    width: 100%;
    line-height: 20px;
    height: 20px;

    color: #eee;
    opacity: .95;
    border-radius: 5px;
    background: #794c1b;
  }
  span {
    display: block;
    margin: 0;
    p {
      margin: 15px 0;
    }
    span {
      position: relative;

      top: -5px;

      font-size: 12px;
      opacity: .75;
    }
    position: absolute;

    top: 100%;
    left: 50%;

    width: max-content;

    transform: translateX(-50%);
  }
  i, svg {
    position: absolute;

    width: 40px;
    height: 40px;

    color: #eee; //#794c1b;
  }
  position: relative;
  margin: 45px 70px;

  width: 64px;
  height: 64px;

  border-radius: 50%;
  background-image: linear-gradient(115deg, #cfaa83 0%, #daa876 0%, #e1c0a3 21%, #c09c73 32%, #754716 100%);
}

.ProPlan-Rights-Rights {
  z-index: 2;
  position: absolute;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

  width: 90%;
  height: 200px;

  top: 15%;
  left: 5%;

}
.ProPlan-Rights {
  &:after {
    z-index: 0;
    content: "";
    position: absolute;

    top: -30px;

    width: 80%;
    height: 200px;

    left: 10%;

    border-radius: 8px 8px 0 0;
    background-color: var(--el-fill-color);
    //background-image: linear-gradient(115deg, #cfaa83 0%, #daa876 0%, #e1c0a3 21%, #c09c73 32%, #754716 100%);
  }
  &:before {
    z-index: 1;
    content: "";
    position: absolute;

    left: 0;
    top: 0%;

    width: 100%;
    height: 100%;

    //filter: drop-shadow(-2 -2 8px #eee);
    //box-shadow: 0 0 8px 2px #fff inset;
    border-radius: 8px;
    filter: drop-shadow(1px 1px 20px crimson);
    -webkit-mask: radial-gradient(circle at center -1675%, transparent 95%, red 6780px);
    background-color: var(--el-fill-color-lighter);
    //background-image: linear-gradient(115deg, #cfaa83 0%, #daa876 0%, #e1c0a3 19%, #c09c73 29%, #754716 100%);
  }
  position: relative;
  margin-bottom: 60px;

  top: 30px;

  width: 100%;
  height: 400px;

  border-radius: 8px;
  //box-shadow: 0 0 8px 2px #fff inset;
  background-color: var(--el-fill-color-lighter);
  //background-image: linear-gradient(115deg, #cfaa83 0%, #daa876 0%, #e1c0a3 21%, #c09c73 32%, #754716 100%);
  //overflow: hidden;
}

.ProPlan-Info-Desc {
  .plan-info-desc-line {
    & > span {
      font-weight: 600;
      font-size: 16px;
    }
    padding: 4px 16px;
    font-size: 14px;
    border-radius: 4px;
    //background-image: linear-gradient(115deg, #cfaa83 0%, #daa876 0%, #e1c0a3 21%, #c09c73 32%, #754716 100%);
    background-color: var(--el-fill-color-light);
  }
  position: relative;
  padding: 4px 0;
  display: flex;
  justify-content: space-between;
  margin: 20px 0;

  width: 100%;

  opacity: .95;
  border-radius: 8px;
}

.ProPlan-GoldDiamond {
  .gold-diamond-inner {
    position: absolute;

    width: 80%;
    height: 80%;

    top: 10%;
    left: 10%;

    line-height: 120%;
    font-size: 60px;
    text-align: center;

    clip-path: polygon(25% 5%, 75% 5%, 97% 30%, 50% 90%, 3% 30%);
    background: linear-gradient(50deg, #cab6ac, #a87b61, rgba(185, 151, 133, 0.8) 46%, #ac7f66 58%, #a6785f 100%);
  }
  position: absolute;

  left: 50%;

  width: 60%;
  height: calc(80% - 36px);

  top: 35%;

  clip-path: polygon(25% 5%, 75% 5%, 100% 30%, 50% 100%, 0% 30%);
  transform: translateX(-50%);
  background: linear-gradient(to right bottom, #fef8f2, #f5d7bb 60%);
}
.ProPlan-GoldBanner {
  .left, .right {
    z-index: -1;
    position: absolute;

    width: 40px;
    height: 100%;

    left: -25px;
    top: -10px;

    border-radius: 8px 4px 4px 8px;
    transform: rotate(3deg);
    -webkit-mask: radial-gradient(circle at 0, transparent 4px, red 1px);
    background: linear-gradient(to left bottom, #fef8f2, #f5d7bb 60%);
  }
  .right {
    left: unset;
    right: -25px;

    border-radius: 4px 8px 8px 4px;
    transform: rotate(-3deg);
    -webkit-mask: radial-gradient(circle at right, transparent 4px, red 1px);
    background: linear-gradient(to right bottom, #fef8f2, #f5d7bb 60%);
  }
  .gold-main {
    z-index: 1;
    position: absolute;

    width: 100%;
    height: 100%;

    top: 0;

    font-size: 20px;
    font-weight: bolder;
    letter-spacing: 2px;
    line-height: 36px;
    color: #a5746c;

    text-align: center;
    box-shadow: 0 0 2px 0 #fef8f2;
    background: linear-gradient(to right bottom, #fef8f2, #f5d7bb 60%);
  }
  position: absolute;

  left: 50%;
  bottom: 0;

  width: 60%;
  height: 36px;

  border-radius: 4px;
  transform: translate(-50%, 0);
}
.ProPlan-Gold {
  .ProPlan-GoldBackRound {
    &:before, &:after {
      content: "";
      position: absolute;

      top: 50%;
      left: 50%;

      width: 96px;
      height: 96px;

      opacity: .05;
      border-radius: 50%;
      background-color: #fef8f2;
      transform: translate(-50%, -50%);
    }
    //&:after {
    //  opacity: .45;
    //  transform: translate(-40%, -55%);
    //}
    position: absolute;

    left: 50%;

    width: 80%;

    aspect-ratio: 1 / 1;
    border-radius: 50%;
    opacity: .95;
    background-image: linear-gradient(-145deg, #cfaa83 0%, #daa876 0%, #e1c0a3 21%, #c09c73 52%, #754716 100%);
    transform: translate(-50%, 0);
  }
  position: absolute;

  right: 4.5%;
  top: 5%;

  width: 200px;
  height: 90%;

  user-select: none;
}

.ProPlan-Info {
  .ProPlan-Info-Profile {
    .ProPlan-GoldProgressbar {
      &:before {
        content: "";
        position: absolute;

        width: 100%;
      }

      width: 100%;
    }
    &:before {
      content: "";
      position: absolute;

      width: 95%;
      height: 5px;

      opacity: .5;
      background: #a37b51; //linear-gradient(to right, transparent, #e1bfa0, transparent 100%);
      border-radius: 2px;
    }
    position: absolute;

    width: 100%;
    height: 60px;

    top: 150%;

    span {
      position: relative;

      top: 10px;

      font-size: 14px;
      opacity: .75;
    }
    //background-color: red;
  }
  h1 {
    &:before {
      content: "";
      position: absolute;

      left: 0;
      bottom: -10px;

      width: 100%;
      height: 10px;

      opacity: .5;
      background-color: #fff;
    }
    //&:after {
    //  content: "暂未获得";
    //  position: absolute;
    //  padding: 0 5px;
    //
    //  left: 0;
    //  top: 150%;
    //
    //  width: 100%;
    //  height: 32px;
    //
    //  line-height: 32px;
    //  text-align: center;
    //  font-size: 18px;
    //  border-radius: 50px;
    //  //background-color: rgba(255, 255, 255, 0.5);
    //  transform: skewX(10deg);
    //}
    letter-spacing: 2px;
    font-weight: bolder;
    transform: skewX(-10deg);
  }
  position: absolute;
  padding: 10px 0;

  left: 5%;

  user-select: none;
}

.ProPlan-Card {
  &:before {
    content: "V";
    position: absolute;

    right: 5%;
    top: 100%;

    height: 100%;

    color: #e1c0a3;
    opacity: .2;
    font-size: 300px;
    transform: translate(0, -50%) scale(2);
  }
  position: relative;

  width: 100%;
  height: 200px;

  color: #fff;
  border-radius: 8px;
  background-image: linear-gradient(115deg, #cfaa83 0%, #daa876 0%, #e1c0a3 21%, #c09c73 32%, #754716 100%);
  overflow: hidden;
}
</style>
