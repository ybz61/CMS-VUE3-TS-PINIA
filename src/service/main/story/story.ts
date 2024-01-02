import appRequest from '@/service'

export function createNewStory(storyInfo: any) {
  return appRequest.post({
    url: '/story',
    data: storyInfo
  })
}

export function postStoryList(queryInfo: any) {
  return appRequest.post({
    url: '/story/list',
    data: queryInfo
  })
}
