<template>
  <div class="pane_phone">
    <el-form label-width="60px" size="large">
      <el-form-item label="手机号">
        <el-input />
      </el-form-item>
      <el-form-item label="验证码">
        <div class="verify_code">
          <el-input />
          <el-button class="get_code_btn" type="primary">获取验证码</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="less">
.verify_code {
  display: flex;

  .get_code_btn {
    margin-left: 8px;
  }
}
</style>
