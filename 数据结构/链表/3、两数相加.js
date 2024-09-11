/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function (l1, l2) {
  let n1 = l1,
    n2 = l2;
  let dummy = new ListNode(-1),
    list = dummy;
  let p = 0,
    t = 0;

  while (n1 !== null && n2 !== null) {
    p = (n1.val + n2.val + t) % 10;
    t = Math.floor((n1.val + n2.val + t) / 10);
    n1 = n1.next;
    n2 = n2.next;
    list.next = new ListNode(p);
    list = list.next;
  }
  while (n1 !== null) {
    p = (n1.val + t) % 10;
    t = Math.floor((n1.val + t) / 10);
    n1 = n1.next;
    list.next = new ListNode(p);
    list = list.next;
  }
  while (n2 !== null) {
    p = (n2.val + t) % 10;
    t = Math.floor((n2.val + t) / 10);
    n2 = n2.next;
    list.next = new ListNode(p);
    list = list.next;
  }
  if (t) {
    const node = new ListNode(t);
    list.next = node;
  }
  return dummy.next;
};
