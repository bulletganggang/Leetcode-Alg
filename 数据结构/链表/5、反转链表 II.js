/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} left
 * @param {number} right
 * @return {ListNode}
 */
var reverseBetween = function (head, left, right) {
  let leftHead = head,
    rightHead = head;
  for (let i = 0; i < left - 2; i++) {
    if (leftHead === null || leftHead.next === null) {
      return leftHead;
    }
    leftHead = leftHead.next;
  }
  for (let i = 0; i < right - 1; i++) {
    if (rightHead === null || rightHead.next === null) {
      return rightHead;
    }
    rightHead = rightHead.next;
  }
};

var reverseList = function (head) {
  if (head === null || head.next === null) {
    return head;
  }
  const last = traverse(head.next);
  head.next.next = head;
  head.next = null;
  return last;
};
