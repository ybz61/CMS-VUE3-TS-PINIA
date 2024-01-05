<template>
  <div class="content">
    <div class="header">
      <h3 class="title">用户列表</h3>
      <el-button v-if="isCreate" type="primary" @click="handleNewUserClick">新建用户</el-button>
    </div>
    <div class="table">
      <el-table :data="userList" border style="width: 100%" v-loading="isLoading">
        <el-table-column align="center" type="selection" width="50px" />
        <el-table-column align="center" type="index" label="序号" width="60px" />

        <el-table-column align="center" label="用户名" prop="name" width="150px" />
        <el-table-column align="center" label="真实姓名" prop="realname" width="150px" />
        <el-table-column align="center" label="手机号码" prop="cellphone" width="150px" />

        <el-table-column align="center" label="状态" prop="enable" width="140px">
          <!-- 作用域插槽 -->
          <template #default="scope">
            {{ scope.row.enable ? '已启用' : '已禁用' }}
            <!-- <el-text size="small" :type="scope.row.enable ? 'primary' : 'danger'" plain>
              {{ scope.row.enable ? '已启用' : '已禁用' }}
            </el-text>
            <el-button size="small" :type="!scope.row.enable ? 'primary' : 'danger'" plain>
              {{ !scope.row.enable ? '启用' : '禁用' }}
            </el-button> -->
          </template>
        </el-table-column>

        <el-table-column align="center" label="创建时间" prop="createAt">
          <!-- 作用域插槽 -->
          <template #default="scope">
            {{ formatUTC(scope.row.createAt) }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="更新时间" prop="updateAt">
          <!-- 作用域插槽 -->
          <template #default="scope">
            {{ formatUTC(scope.row.updateAt) }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="操作" width="150px">
          <template #default="scope">
            <el-button
              v-if="isUpdate"
              size="small"
              icon="Edit"
              type="primary"
              text
              @click="handleEditClick(scope.row)"
            >
              编辑
            </el-button>
            <el-button
              v-if="isDelete"
              size="small"
              icon="Delete"
              type="danger"
              text
              @click="handleDeleteClick(scope.row.id)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 30]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="userTotalCount"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import useSystemStore from '@/store/main/system/system'
import { formatUTC } from '@/utils/format'
import usePermissions from '@/hooks/usePermissions'

// 用户的权限判断
const isCreate = usePermissions('users:create')
const isDelete = usePermissions('users:delete')
const isUpdate = usePermissions('users:delete')
const isQuery = usePermissions('users:query')

// 1 发起action，请求usersList的数据
const systemStore = useSystemStore()
const pageSize = ref(10)
const currentPage = ref(1)

// 监听systemStore中的actions被执行：订阅action
systemStore.$onAction(({ name, after }) => {
  // console.log('[ action被执行 ] >')
  // 通过name判断是否是对应的action
  after(() => {
    if (
      name === 'deleteUserByIdAction' ||
      name === 'editUserDataAction' ||
      name === 'newUserDataAction'
    ) {
      console.log('[ 页码回到第一页 ] >')
      currentPage.value = 1
    }
  })
})
fetchUserListData()

// 2 获取usersList数据,进行展示
const { userList, userTotalCount, isLoading } = storeToRefs(systemStore)

// 3 页码相关
function handleSizeChange() {
  // console.log('[ page-size change ] >', pageSize.value)
  fetchUserListData()
}
function handleCurrentChange() {
  // console.log('[ current-size change ] >', currentPage.value)
  fetchUserListData()
}

// 4 定义函数, 用于发送网络请求
function fetchUserListData(formData: any = {}) {
  if (!isQuery) return

  // 1 获取offset/size
  const size = pageSize.value
  const offset = (currentPage.value - 1) * size
  const pageInfo = { size, offset }

  // 2 发起网络请求
  const queryInfo = { ...pageInfo, ...formData }
  systemStore.postUserListAction(queryInfo)
}

// 定义自定义事件
const emit = defineEmits(['newClick', 'editClick'])

// 5 删除/新建/编辑的操作
function handleNewUserClick() {
  // console.log('[ new ] >')
  emit('newClick')
}
function handleEditClick(itemData: any) {
  // console.log('[ edit ] >', itemData)
  emit('editClick', itemData)
}
function handleDeleteClick(id: number) {
  // console.log('[ delete ] >', id)
  systemStore.deleteUserByIdAction(id)
}

// 暴露给父组件的方法
defineExpose({
  fetchUserListData
})
</script>

<style scoped lang="less">
.content {
  margin-top: 20px;
  padding: 20px;
  background-color: #fff;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 10px;
  .title {
    font-size: 22px;
  }
}
.table {
  :deep(.el-table__cell) {
    padding: 12px 0;
  }
  .el-text {
    padding: 0 8px;
  }
  .el-button {
    margin-left: 0;
    padding: 5px 8px;
  }
}
.pagination {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}
</style>
