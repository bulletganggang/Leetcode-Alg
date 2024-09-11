/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
var mergeTwoLists = function (list1, list2) {
  let head1 = list1,
    head2 = list2;
  let dummy = new ListNode(-1),
    list = dummy;
  while (head1 !== null && head2 !== null) {
    if (head1.val < head2.val) {
      list.next = head1;
      head1 = head1.next;
    } else {
      list.next = head2;
      head2 = head2.next;
    }
    list = list.next;
  }
  if (head1 !== null) {
    list.next = head1;
  }
  if (head2 !== null) {
    list.next = head2;
  }
  return dummy.next;
};
