package com.signatureWebApp.demo.services.Dilithium;

import org.springframework.stereotype.Service;
import net.thiim.dilithium.interfaces.DilithiumParameterSpec;
import com.signatureWebApp.demo.services.Dilithium.DilithiumService;

@Service
public class Dilithium2Service extends DilithiumService {
    @Override
    protected DilithiumParameterSpec getLevel() {
        return DilithiumParameterSpec.LEVEL2;
    }
}