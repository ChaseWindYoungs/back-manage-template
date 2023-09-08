export interface Rule {
  /**
   * input框绑定值
   */
  filedValue: string

  /**
   * 每个规则唯一标识
   */
  id: string

  /**
   * 规则之间的连接符 0 且 1 或
   */
  unit: string

  /**
   * 当前规则所属层级
   */
  depth: number

  /**
   * 子集规则
   */
  children?: Array<Rule>
}
