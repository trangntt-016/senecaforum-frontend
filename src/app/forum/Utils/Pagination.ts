export class Pagination{
    private currentPage;
    private perPage;
    private pageSize;
    public Pagination(perPage, pageSize){
        this.pageSize = pageSize;
        this.perPage = perPage
        this.currentPage = 1;
    }

    public next(){
        this.currentPage+=1;
      }
    
    public prev(){
        if(this.currentPage>1){
          this.currentPage-=1;
        }

      }
}