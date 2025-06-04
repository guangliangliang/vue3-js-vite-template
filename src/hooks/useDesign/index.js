export const useDesign = () => {
  /**
   * @param scope 类名
   * @returns 返回空间名-类名
   */
  const getPrefixCls = (scope) => {
    return `${scope}`
  }

  return {
    variables: null,
    getPrefixCls
  }
}
