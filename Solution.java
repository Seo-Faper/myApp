class Solution {
  public String solution(int n) {
      String answer = "";
   	while(true) {
			if(n%3!=0) {
				answer =n%3+answer;
				n = n/3;
			}else {
				answer = 4+answer;
				n = n/3-1;
			}
			
			if(n<1) {
				break;
			}
		}
      return answer;
  }
}
