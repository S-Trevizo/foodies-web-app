package learn.recipemanager.models.viewmodels;

public class SearchCriteria {
    private String fetchString;//used to make requests to external api
    private String searchCriteria;
    public void SearchCriteria(String fetchString, String searchCriteria) {
        this.fetchString = fetchString;
        this.searchCriteria = searchCriteria;
    }
    public void setSearchCriteria(String searchCriteria) {
        this.searchCriteria = searchCriteria;
    }

    public String getSearchCriteria() {
        return searchCriteria;
    }

    public String getFetchString() {return fetchString;}
}
