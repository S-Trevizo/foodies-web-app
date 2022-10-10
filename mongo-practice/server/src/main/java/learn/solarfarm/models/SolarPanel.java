package learn.solarfarm.models;

import org.springframework.data.annotation.Id;

import java.util.Objects;

public class SolarPanel {
    @Id
    private String id;
    private String section;
    private int row;
    private int column;
    private int yearInstalled;
    private Material material;
    private boolean isTracking;

    public SolarPanel() {
    }

    public SolarPanel(String id, String section, int row, int column, int yearInstalled, Material material, boolean isTracking) {
        this.id = id;
        this.section = section;
        this.row = row;
        this.column = column;
        this.yearInstalled = yearInstalled;
        this.material = material;
        this.isTracking = isTracking;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getSection() {
        return section;
    }

    public void setSection(String section) {
        this.section = section;
    }

    public int getRow() {
        return row;
    }

    public void setRow(int row) {
        this.row = row;
    }

    public int getColumn() {
        return column;
    }

    public void setColumn(int column) {
        this.column = column;
    }

    public int getYearInstalled() {
        return yearInstalled;
    }

    public void setYearInstalled(int yearInstalled) {
        this.yearInstalled = yearInstalled;
    }

    public Material getMaterial() {
        return material;
    }

    public void setMaterial(Material material) {
        this.material = material;
    }

    public boolean isTracking() {
        return isTracking;
    }

    public void setTracking(boolean tracking) {
        isTracking = tracking;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        SolarPanel that = (SolarPanel) o;
        return id == that.id && row == that.row && column == that.column && yearInstalled == that.yearInstalled && isTracking == that.isTracking && Objects.equals(section, that.section) && material == that.material;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, section, row, column, yearInstalled, material, isTracking);
    }
}
