<div className="col-6 mt-3">

                      <label>Selecciona opciones:</label>
                        <Field
                          name="especialidad"
                          as="select"
                          multiple
                        >
                          {especialidades.map(item => (
                            <option key={item.id} value={item.id}>
                              {item.especialidad}
                            </option>
                            ))}
                        </Field>
                      </div>