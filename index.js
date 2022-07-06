/*
  135. Candy
  Hard
  
  There are n children standing in a line. Each child is assigned a rating value given in the integer array ratings.

  You are giving candies to these children subjected to the following requirements:

  Each child must have at least one candy.
  Children with a higher rating get more candies than their neighbors.
  Return the minimum number of candies you need to have to distribute the candies to the children.



  Example 1:

  Input: ratings = [1,0,2]
  Output: 5
  Explanation: You can allocate to the first, second and third child with 2, 1, 2 candies respectively.
  Example 2:

  Input: ratings = [1,2,2]
  Output: 4
  Explanation: You can allocate to the first, second and third child with 1, 2, 1 candies respectively.
  The third child gets 1 candy because it satisfies the above two conditions.
  
  Link: https://leetcode.com/problems/candy/
*/

var candy = function(ratings) {
    var childRatingCandy = {};
    ratings.forEach(function(rate, index) {
       childRatingCandy[index] = {
           rate,
           candy: 1,
       }; 
    });

    function balanceChildRatingCandy(n) {
        if(n == 0) {
            if(childRatingCandy[n].rate > childRatingCandy[n + 1].rate && childRatingCandy[n].candy <= childRatingCandy[n + 1].candy) {
                childRatingCandy[n].candy++;
                balanceChildRatingCandy(n);
            }
            else {
                balanceChildRatingCandy(n + 1);
            }
        }
        else if(n == Object.keys(childRatingCandy).length - 1) {
            if(childRatingCandy[n].rate > childRatingCandy[n - 1].rate && childRatingCandy[n].candy <= childRatingCandy[n - 1].candy) {
                childRatingCandy[n].candy++;
                balanceChildRatingCandy(n);
            }
            else {
                return;
            }
        }
        else {
            if(childRatingCandy[n].rate > childRatingCandy[n - 1].rate && childRatingCandy[n].candy <= childRatingCandy[n - 1].candy) {
                childRatingCandy[n].candy++;
                balanceChildRatingCandy(n);
            }
            else if(childRatingCandy[n].rate > childRatingCandy[n + 1].rate && childRatingCandy[n].candy <= childRatingCandy[n + 1].candy) {
                childRatingCandy[n].candy++;
                balanceChildRatingCandy(n);
            }
            else if(childRatingCandy[n].rate < childRatingCandy[n - 1].rate && childRatingCandy[n].candy >= childRatingCandy[n - 1].candy) {
                balanceChildRatingCandy(n - 1);
            }
            else if(childRatingCandy[n].rate < childRatingCandy[n + 1].rate && childRatingCandy[n].candy >= childRatingCandy[n + 1].candy) {
                balanceChildRatingCandy(n + 1);
            }
            else {
                balanceChildRatingCandy(n + 1);
            }
        }
    }

    //Start balancing recursion at the first index
    balanceChildRatingCandy(0);
    
    return Object.keys(childRatingCandy).reduce(function(accumulator, currentValue) {
        return accumulator + childRatingCandy[currentValue].candy;
    }, 0)
};
