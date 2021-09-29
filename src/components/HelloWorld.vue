<template>
  <div class="form-panel">
    <div class="title">
      为了更好的提供服务，需补全信息后方可登录（带
      <label class="require-item">的为必填项）</label>
    </div>
    <div
      v-for="(item) in validateForm"
      :key="item.label"
      :class="['form-item', item.last ? 'last-item' : '']"
    >
      <label :class="item.required ? 'require-item' : ''"
        >{{ item.label }} :
      </label>
      <template v-if="item.type === 'input'">
        <input
          v-model="item.value"
          :class="[
            'input input-long',
            (item.required ? item.errorMsg : false) ? 'error-input' : ''
          ]"
          @keydown.stop
         
          :disabled="item.disabled"
          :placeholder="item.placeholder"
        />
        <div class="error-tip" v-show="item.required ? item.errorMsg : false">
          <div class="verify-tip verify-bottom" style="left: 0px;">
            <div class="verify-tip-arrow"></div>
            <div
              title="companyName is required"
              class="verify-tip-inner"
              style="max-width: 397px;"
            >
              {{ item.errorMsg }}
              <i
                class="iuv-iconfont iconguanbi"
                @click="item.errorMsg = ''"
              ></i>
            </div>
          </div>
        </div>
      </template>
      <template v-else-if="item.type === 'input-button'">
        <input
          v-model="item.value"
          type="text"
          @keydown.stop
          
          :placeholder="item.placeholder"
          :class="[
            'input input-short',
            (item.required ? item.errorMsg : false) ? 'error-input' : ''
          ]"
        />
        <div
          :class="['code', getCodeInterval ? 'code-disabled' : '']"
          
        >
          {{ getCodeText }}
        </div>
        <div class="error-tip" v-show="item.errorMsg">
          <div class="verify-tip verify-bottom" style="left: 0px;">
            <div class="verify-tip-arrow"></div>
            <div
              title="companyName is required"
              class="verify-tip-inner"
              style="max-width: 397px;"
            >
              {{ item.errorMsg }}
              <i
                class="iuv-iconfont iconguanbi"
                @click="item.errorMsg = ''"
              ></i>
            </div>
          </div>
        </div>
      </template>
      <template v-else-if="item.type === 'select'">
        <div style="width:300px;display:inline-block;">
          <select
            v-model="item.value"
            :clearable="false"
            :placeholder="item.placeholder"
            @on-change="changeSelect($event, item.key)"
          >
            <option
              v-for="option in item.options"
              :value="option.code"
              :key="option.code"
              >{{ option.name }}</option
            >
          </select>
          <select
            v-if="item.key === 'countryOrRegion' && item.value === '156'"
            v-model="item.extend.value"
            :clearable="false"
            :placeholder="item.extend.placeholder"
            class="select-extend"
          >
            <option
              v-for="option in item.extend.options"
              :value="option.code"
              :key="option.code"
              >{{ option.name }}</option
            >
          </select>
          <input
            v-if="item.key === 'mainFocusMarketType' && item.value === '99'"
            v-model="item.extend.value"
            type="text"
            @keydown.stop
            :placeholder="item.extend.placeholder"
            :class="[
              'input input-extend-short',
              (item.extend.required
              ? item.extend.errorMsg
              : false)
                ? 'error-input'
                : ''
            ]"
          />
        </div>
      </template>
    </div>
    <div class="tips">{{ errorMsg }}</div>
    <div class="form-item-end">
      <div class="form-button form-button-confirm" >
        完成
      </div>
    </div>
  </div>
</template>
<script>
let getCodeText = "发送验证码";
export default {
  data() {
    return {
      getCodeText: getCodeText,
      getCodeInterval: null,
      nameIsValid: true,
      mobileIsValid: true,
      codeIsValid: true,
      emailIsValid: true,
      validateForm: [
        {
          id: 1,
          value: "",
          key: "companyName",
          label: "公司名称",
          type: "input",
          disabled: true,
          required: false,
          placeholder: ""
        },
        {
          id: 1,
          value: "",
          key: "loginName",
          label: "账号",
          type: "input",
          disabled: true,
          required: false,
          placeholder: ""
        },
        {
          id: 1,
          value: "",
          key: "userName",
          label: "姓名",
          type: "input",
          disabled: false,
          required: true,
          validateFlag: "nameIsValid",
          placeholder: "请输入姓名",
          errorMsg: "",
          validateFun: this.validateName
        },
        {
          id: 1,
          value: "9",
          key: "sex",
          label: "性别",
          type: "radio",
          disabled: false,
          required: false,
          options: [
            { label: "9", name: "保密" },
            { label: "1", name: "男" },
            { label: "2", name: "女" }
          ],
          placeholder: ""
        },
        {
          id: 1,
          value: "",
          key: "mobile",
          label: "手机号码",
          type: "input",
          disabled: false,
          required: true,
          validateFlag: "mobileIsValid",
          placeholder: "请输入手机号码",
          errorMsg: "",
          validateFun: this.validateMobile
        },
        {
          id: 1,
          value: "",
          key: "checkCode",
          label: "验证码",
          type: "input-button",
          disabled: false,
          required: true,
          validateFlag: "codeIsValid",
          placeholder: "请输入验证码",
          errorMsg: "",
          validateFun: this.validateCode
        },
        {
          id: 1,
          value: "",
          key: "email",
          label: "电子邮箱",
          type: "input",
          disabled: false,
          required: true,
          validateFlag: "emailIsValid",
          placeholder: "请输入电子邮箱，邮箱确认后不可修改",
          errorMsg: "",
          validateFun: this.validateEmail
        },
        {
          id: 1,
          value: "",
          key: "mainFocusMarketType",
          label: "关注市场",
          type: "select",
          disabled: false,
          required: false,
          options: [
            {
              code: "01",
              name: "外汇市场"
            },
            {
              code: "02",
              name: "固定收益"
            },
            {
              code: "03",
              name: "货币市场"
            },
            {
              code: "04",
              name: "大宗商品"
            },
            {
              code: "05",
              name: "证券市场"
            },
            {
              code: "99",
              name: "其他"
            }
          ],
          placeholder: "请选择关注市场",
          extend: {
            value: "",
            required: false,
            placeholder: "请填写具体市场"
          }
        },
        {
          id: 1,
          value: "",
          key: "department",
          label: "部门",
          type: "input",
          disabled: false,
          required: false,
          placeholder: "请输入您所在的部门"
        },
        {
          id: 1,
          value: "",
          key: "position",
          label: "职位",
          type: "input",
          disabled: false,
          required: false,
          placeholder: "请输入您的职位"
        },
        {
          id: 1,
          value: "",
          key: "telephone",
          label: "固定电话",
          type: "input",
          disabled: false,
          required: false,
          placeholder: "请输入固定电话号码"
        },
        {
          id: 1,
          value: "",
          key: "countryOrRegion",
          label: "所在地区",
          type: "select",
          options: [],
          disabled: false,
          required: false,
          placeholder: "请选择国家",
          extend: {
            value: "",
            placeholder: "请选择地区",
            options: []
          }
        },
        {
          id: 1,
          value: "",
          key: "addrInfo",
          label: "办公地址",
          type: "input",
          disabled: false,
          required: false,
          last: true,
          placeholder: "请输入您的办公地址"
        }
      ],
      countries: [],
      model: {},
      errorMsg: ""
    };
  }
};
</script>
