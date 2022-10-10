package learn.solarfarm.models;

/**
 * Represents a solar panel material.
 */
public enum Material {
    POLY_SI("Multicrystalline Silicon", "poly-Si"),
    MONO_SI("Monocrystalline Silicon", "mono-Si"),
    A_SI("Amorphous Silicon", "a-Si"),
    CD_TE("Cadmium Telluride", "CdTe"),
    CIGS("Copper Indium Gallium Selenide", "CIGS");

    private final String name;
    private final String abbreviation;

    Material(String name, String abbreviation) {
        this.name = name;
        this.abbreviation = abbreviation;
    }

    /**
     * The material name.
     * @return A String representing the material name.
     */
    public String getName() {
        return name;
    }

    /**
     * The abbreviation.
     * @return A String representing the material abbreviation.
     */
    public String getAbbreviation() {
        return abbreviation;
    }

    /**
     * Find a Material by its name.
     * @param name The name of the Material to find.
     * @return A Material enum value.
     */
    public static Material findByName(String name) {
        for (Material material : Material.values()) {
            if (material.getName().equalsIgnoreCase(name)) {
                return material;
            }
        }
        String message = String.format("No Material with name: %s.", name);
        throw new RuntimeException(message);
    }
}
